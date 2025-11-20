using MediatR;

namespace OnlineStoreOrders.Application.Products.Commands.DeleteProduct
{
    public record DeleteProductCommand(int Id) : IRequest<bool>;
}
