using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure.Persistence;
using OnlineStoreOrders.Infrastructure.Persistence.Mongo;
using OnlineStoreOrders.Infrastructure.Repositories;

namespace OnlineStoreOrders.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
        {
            // SQL Server (Write Model)
            services.AddDbContext<SqlServerDbContext>(options =>
                options.UseSqlServer(config.GetConnectionString("SqlServer")));

            // MongoDB (Read Model)
            var mongoSettings = new MongoSettings
            {
                ConnectionString = config.GetConnectionString("MongoDb")!,
                DatabaseName = config["MongoSettings:DatabaseName"]!
            };

            var mongoClient = new MongoClient(mongoSettings.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoSettings.DatabaseName);

            services.AddSingleton(mongoDatabase);

            // Repositories
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();

            return services;
        }
    }
}
