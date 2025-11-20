using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Domain.Interfaces
{
    public interface IOrderReadRepository
    {
        Task<OrderReadModel?> GetAsync(Guid id);
        Task<IEnumerable<OrderReadModel>> GetAllAsync();
        Task<OrderReadModel?> GetByIdAsync(Guid id);
        Task UpsertAsync(OrderReadModel model);
        Task DeleteAsync(Guid id); 
    }
}
