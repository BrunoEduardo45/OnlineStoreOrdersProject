using MediatR;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Application.Orders.Queries.GetAllOrders
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, IEnumerable<OrderReadModel>>
    {
        private readonly IOrderReadRepository _readRepository;

        public GetAllOrdersQueryHandler(IOrderReadRepository readRepository)
        {
            _readRepository = readRepository;
        }

        public async Task<IEnumerable<OrderReadModel>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            return await _readRepository.GetAllAsync();
        }
    }
}
