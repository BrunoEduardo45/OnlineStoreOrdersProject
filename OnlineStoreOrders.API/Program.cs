using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using OnlineStoreOrders.Application.Orders.Commands.CreateOrder;
using OnlineStoreOrders.Application.Products.Commands.CreateProduct;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Infrastructure;
using OnlineStoreOrders.Infrastructure.Repositories;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Ajuste do GUID no MongoDB
MongoDB.Bson.Serialization.BsonSerializer.RegisterSerializer(
    typeof(Guid),
    new MongoDB.Bson.Serialization.Serializers.GuidSerializer(MongoDB.Bson.GuidRepresentation.Standard)
);

// Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Infrastructure
builder.Services.AddInfrastructure(builder.Configuration);


// Repositório de escrita para Product (não está no AddInfrastructure)
builder.Services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

// MediatR
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(OnlineStoreOrders.Application.AssemblyReference).Assembly));

// Dapper connection
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(builder.Configuration.GetConnectionString("SqlServer")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
