using Microsoft.EntityFrameworkCore;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure.Persistence;

namespace OnlineStoreOrders.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly SqlServerDbContext _context;

        public ProductRepository(SqlServerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
            => await _context.Products.ToListAsync();

        public async Task<Product?> GetByIdAsync(int id)
            => await _context.Products.FindAsync(id);
    }
}
