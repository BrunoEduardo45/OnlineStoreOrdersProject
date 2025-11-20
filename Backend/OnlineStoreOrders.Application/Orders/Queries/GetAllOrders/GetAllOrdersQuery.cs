using MediatR;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Application.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersQuery : IRequest<IEnumerable<OrderReadModel>>
    {
    }
}
