using OnlineStoreOrders.Domain.Entities;

namespace OnlineStoreOrders.Domain.Interfaces
{
    public interface IProductWriteRepository
    {
        Task CreateAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
    }
}
