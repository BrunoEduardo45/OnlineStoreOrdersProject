using MediatR;
using OnlineStoreOrders.Domain.Entities;

namespace OnlineStoreOrders.Application.Products.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<IEnumerable<Product>>
    {
    }
}
