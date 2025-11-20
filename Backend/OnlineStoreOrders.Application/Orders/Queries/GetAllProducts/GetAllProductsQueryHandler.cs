using MediatR;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.Application.Products.Queries.GetAllProducts
{
    public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
    {
        private readonly IProductRepository _repo;

        public GetAllProductsQueryHandler(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetAllAsync();
        }
    }
}
