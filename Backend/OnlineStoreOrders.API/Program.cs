using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineStoreOrders.Application.Orders.Commands.CreateOrder;
using OnlineStoreOrders.Application.Products.Commands.CreateProduct;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure;
using OnlineStoreOrders.Infrastructure.Persistence;
using OnlineStoreOrders.Infrastructure.Repositories;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Dapper 
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(builder.Configuration.GetConnectionString("SqlServer")));

// DbContext do Entity Framework
builder.Services.AddDbContext<SqlServerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"))
);

// serviços para Product
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// MediatR
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(OnlineStoreOrders.Application.AssemblyReference).Assembly));

// Ajuste do GUID no MongoDB
MongoDB.Bson.Serialization.BsonSerializer.RegisterSerializer<Guid>(
    new MongoDB.Bson.Serialization.Serializers.GuidSerializer(MongoDB.Bson.GuidRepresentation.Standard)
);

// Infrastructure
builder.Services.AddInfrastructure(builder.Configuration);

// Repositório de escrita para Product
builder.Services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
