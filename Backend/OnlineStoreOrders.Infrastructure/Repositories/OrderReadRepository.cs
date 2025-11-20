using MongoDB.Driver;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Domain.ReadModels;

namespace OnlineStoreOrders.Infrastructure.Repositories;

public class OrderReadRepository : IOrderReadRepository
{
    private readonly IMongoCollection<OrderReadModel> _collection;

    public OrderReadRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<OrderReadModel>("orders_read");
    }

    public async Task UpsertAsync(OrderReadModel model)
    {
        await _collection.ReplaceOneAsync(
            x => x.Id == model.Id,
            model,
            new ReplaceOptions { IsUpsert = true }
        );
    }

    public async Task<OrderReadModel?> GetAsync(Guid id) =>
        await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<IEnumerable<OrderReadModel>> GetAllAsync() =>
        await _collection.Find(_ => true).ToListAsync();

    public async Task<OrderReadModel?> GetByIdAsync(Guid id) =>
        await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task DeleteAsync(Guid id)
    {
        await _collection.DeleteOneAsync(x => x.Id == id);
    }
}
