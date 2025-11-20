using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure.Persistence;

namespace OnlineStoreOrders.Infrastructure.Repositories
{
    public class ProductWriteRepository : IProductWriteRepository
    {
        private readonly SqlServerDbContext _context;

        public ProductWriteRepository(SqlServerDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Products.FindAsync(id);
            if (entity != null)
            {
                _context.Products.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
