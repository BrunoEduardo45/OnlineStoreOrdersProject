using MediatR;

namespace OnlineStoreOrders.Application.Orders.Commands.DeleteOrder;

public record DeleteOrderCommand(Guid OrderId) : IRequest<bool>;
