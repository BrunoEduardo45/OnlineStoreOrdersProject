using MediatR;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Application.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderReadModel?>
    {
        private readonly IOrderReadRepository _readRepository;

        public GetOrderByIdQueryHandler(IOrderReadRepository readRepository)
        {
            _readRepository = readRepository;
        }

        public async Task<OrderReadModel?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            return await _readRepository.GetByIdAsync(request.Id);
        }
    }
}
