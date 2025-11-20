using Microsoft.EntityFrameworkCore;
using OnlineStoreOrders.Domain.Entities;

namespace OnlineStoreOrders.Infrastructure.Persistence
{
    public class SqlServerDbContext : DbContext
    {
        public SqlServerDbContext(DbContextOptions<SqlServerDbContext> options)
            : base(options)
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Name).IsRequired();
                e.Property(c => c.Email).IsRequired();
            });

            modelBuilder.Entity<Order>(e =>
            {
                e.HasKey(o => o.Id);
                e.Property(o => o.TotalAmount)
                 .HasColumnType("decimal(18,2)");

                e.HasOne(o => o.Customer)
                 .WithMany(c => c.Orders)
                 .HasForeignKey(o => o.CustomerId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<OrderItem>(e =>
            {
                e.HasKey(oi => oi.Id);
                e.Property(oi => oi.UnitPrice)
                 .HasColumnType("decimal(18,2)");

                e.HasOne(oi => oi.Order)
                 .WithMany(o => o.Items)
                 .HasForeignKey(oi => oi.OrderId)
                 .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(oi => oi.Product)
                 .WithMany()
                 .HasForeignKey(oi => oi.ProductId);
            });

            modelBuilder.Entity<Product>(e =>
            {
                e.HasKey(p => p.Id);
                e.Property(p => p.Price).HasColumnType("decimal(18,2)");
            });

            // CUSTOMER FIXO
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "Cliente Fixo",
                    Email = "cliente@exemplo.com",
                    Phone = "71988888888",
                    CreatedAt = new DateTime(2025, 11, 18)
                }
            );
        }
    }
}
