using MediatR;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly IProductRepository _readRepo;
        private readonly IProductWriteRepository _writeRepo;

        public UpdateProductHandler(
            IProductRepository readRepo,
            IProductWriteRepository writeRepo)
        {
            _readRepo = readRepo;
            _writeRepo = writeRepo;
        }

        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _readRepo.GetByIdAsync(request.Id);
            if (product == null) return false;

            product.Name = request.Name;
            product.Price = request.Price;

            await _writeRepo.UpdateAsync(product);
            return true;
        }
    }
}
