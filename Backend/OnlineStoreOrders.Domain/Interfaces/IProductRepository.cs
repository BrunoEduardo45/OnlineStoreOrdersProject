using OnlineStoreOrders.Domain.Entities;

namespace OnlineStoreOrders.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
    }
}
