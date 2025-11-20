using MediatR;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.Application.Products.Commands.CreateProduct
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, int>
    {
        private readonly IProductWriteRepository _writeRepo;

        public CreateProductHandler(IProductWriteRepository writeRepo)
        {
            _writeRepo = writeRepo;
        }

        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var p = new Product
            {
                Name = request.Name,
                Price = request.Price
            };

            await _writeRepo.CreateAsync(p);
            return p.Id;
        }
    }
}
