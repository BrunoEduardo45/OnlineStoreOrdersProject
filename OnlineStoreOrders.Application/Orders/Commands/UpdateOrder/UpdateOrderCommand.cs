using MediatR;

namespace OnlineStoreOrders.Application.Orders.Commands.UpdateOrder;

public record UpdateOrderCommand(
    Guid OrderId,
    List<UpdateOrderItemDto> Items,
    string Status
) : IRequest<bool>;

public record UpdateOrderItemDto(Guid ItemId, int Quantity);
