using Microsoft.EntityFrameworkCore;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure.Persistence;

namespace OnlineStoreOrders.Infrastructure.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly SqlServerDbContext _ctx;
    public OrderRepository(SqlServerDbContext ctx) => _ctx = ctx;

    public async Task AddAsync(Order order, CancellationToken ct = default)
    {
        await _ctx.Orders.AddAsync(order, ct);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var e = await _ctx.Orders.FindAsync(new object[] { id }, ct);
        if (e != null) { _ctx.Orders.Remove(e); await _ctx.SaveChangesAsync(ct); }
    }

    public Task<Order?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => _ctx.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == id, ct);

    public async Task UpdateAsync(Order order, CancellationToken ct = default)
    {
        _ctx.Orders.Update(order);
        await _ctx.SaveChangesAsync(ct);
    }
}
