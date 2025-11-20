using MediatR;

namespace OnlineStoreOrders.Application.Products.Commands.UpdateProduct
{
    public record UpdateProductCommand(
        int Id, 
        string Name, 
        decimal Price
    ) : IRequest<bool>;
}
