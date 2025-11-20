using MediatR;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.Application.Orders.Commands.DeleteOrder;

public class DeleteOrderHandler : IRequestHandler<DeleteOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderReadRepository _orderReadRepository;

    public DeleteOrderHandler(
        IOrderRepository orderRepository,
        IOrderReadRepository orderReadRepository)
    {
        _orderRepository = orderRepository;
        _orderReadRepository = orderReadRepository;
    }

    public async Task<bool> Handle(DeleteOrderCommand request, CancellationToken ct)
    {
        await _orderRepository.DeleteAsync(request.OrderId, ct);
        await _orderReadRepository.DeleteAsync(request.OrderId);
        return true;
    }
}
