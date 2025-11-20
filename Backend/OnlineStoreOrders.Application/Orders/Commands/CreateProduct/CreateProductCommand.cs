using MediatR;

namespace OnlineStoreOrders.Application.Products.Commands.CreateProduct
{
    public record CreateProductCommand(string Name, decimal Price) : IRequest<int>;
}
