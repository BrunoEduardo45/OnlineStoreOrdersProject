using MediatR;

namespace OnlineStoreOrders.Application.Orders.Commands.UpdateOrder;

public class UpdateOrderCommand : IRequest<bool>
{
    public Guid OrderId { get; set; }
    public List<UpdateOrderItemDto> Items { get; set; } = new();
    public string Status { get; set; } = string.Empty;
}

public class UpdateOrderItemDto
{
    public int ItemId { get; set; }
    public int Quantity { get; set; }
}

