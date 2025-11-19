using MediatR;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Enums;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Application.Orders.Commands.UpdateOrder;

public class UpdateOrderHandler : IRequestHandler<UpdateOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderReadRepository _orderReadRepository;

    public UpdateOrderHandler(
        IOrderRepository orderRepository,
        IOrderReadRepository orderReadRepository)
    {
        _orderRepository = orderRepository;
        _orderReadRepository = orderReadRepository;
    }

    public async Task<bool> Handle(UpdateOrderCommand request, CancellationToken ct)
    {
        var order = await _orderRepository.GetByIdAsync(request.OrderId, ct);
        if (order == null)
            return false;

        // Atualizar itens existentes
        foreach (var itemUpdate in request.Items)
        {
            var item = order.Items.FirstOrDefault(i => i.Id == itemUpdate.ItemId);
            if (item != null)
            {
                item.Quantity = itemUpdate.Quantity;
            }
        }

        // Atualizar status
        order.Status = Enum.Parse<OrderStatus>(request.Status);
        order.RecalculateTotal();

        await _orderRepository.UpdateAsync(order, ct);

        // Atualiza MongoDB
        var model = new OrderReadModel
        {
            Id = order.Id,
            CustomerName = order.Customer?.Name ?? "",
            CustomerEmail = order.Customer?.Email ?? "",
            TotalAmount = order.TotalAmount,
            OrderDate = order.OrderDate,
            Status = order.Status.ToString(),
            Items = order.Items.Select(i => new OrderItemReadModel
            {
                ProductName = i.ProductName,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                Total = i.TotalPrice
            }).ToList()
        };

        await _orderReadRepository.UpsertAsync(model);

        return true;
    }
}
