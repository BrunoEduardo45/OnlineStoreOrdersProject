using MediatR;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        private readonly IProductWriteRepository _repo;

        public DeleteProductHandler(IProductWriteRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            await _repo.DeleteAsync(request.Id);
            return true;
        }
    }
}
