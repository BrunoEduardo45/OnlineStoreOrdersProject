using MediatR;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Application.Orders.Queries.GetOrderById
{
    public record GetOrderByIdQuery(Guid Id) : IRequest<OrderReadModel?>;
}
