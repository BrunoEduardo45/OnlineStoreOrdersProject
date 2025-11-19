using MediatR;

namespace OnlineStoreOrders.Application.Orders.Commands.CreateOrder;

public record CreateOrderCommand(List<CreateOrderItemDto> Items) : IRequest<Guid>;

public record CreateOrderItemDto(int ProductId, int Quantity);
