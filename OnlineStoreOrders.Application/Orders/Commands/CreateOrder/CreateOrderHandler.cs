using Dapper;
using MediatR;
using OnlineStoreOrders.Domain.Entities;
using OnlineStoreOrders.Domain.Interfaces;
using OnlineStoreOrders.Domain.ReadModels;
using System.Data;

namespace OnlineStoreOrders.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Guid>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderReadRepository _orderReadRepository;
        private readonly IDbConnection _connection;

        public CreateOrderHandler(
            IOrderRepository orderRepository,
            IProductRepository productRepository,
            IOrderReadRepository orderReadRepository,
            IDbConnection connection)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _orderReadRepository = orderReadRepository;
            _connection = connection;
        }

        public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            // CUSTOMER FIXO
            var customerId = Guid.Parse("11111111-1111-1111-1111-111111111111");

            // Buscar Customer via Dapper
            var customer = await _connection.QueryFirstOrDefaultAsync<Customer>(
                "SELECT TOP 1 * FROM Customers WHERE Id = @id",
                new { id = customerId });

            if (customer is null)
            {
                throw new Exception("Customer fixed not found in DB. Insert seed.");
            }

            var order = new Order
            {
                Id = Guid.NewGuid(),
                CustomerId = customer.Id,
                OrderDate = DateTime.UtcNow,
                Status = Domain.Enums.OrderStatus.Pending
            };

            // Adicionar itens
            foreach (var it in request.Items)
            {
                var prod = await _productRepository.GetByIdAsync(it.ProductId);
                if (prod == null)
                    throw new Exception("Product not found.");

                order.Items.Add(new OrderItem
                {
                    Id = Guid.NewGuid(),
                    ProductId = prod.Id,
                    ProductName = prod.Name,
                    Quantity = it.Quantity,
                    UnitPrice = prod.Price
                });
            }

            order.RecalculateTotal();

            // Persistir no SQL Server
            await _orderRepository.AddAsync(order, cancellationToken);

            // Persistir no MongoDB (Read Model)
            var readModel = new OrderReadModel
            {
                Id = order.Id,
                CustomerName = customer.Name,
                CustomerEmail = customer.Email,
                TotalAmount = order.TotalAmount,
                OrderDate = order.OrderDate,
                Status = order.Status.ToString(),
                Items = order.Items.Select(i => new OrderItemReadModel
                {
                    ProductName = i.ProductName,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    Total = i.UnitPrice * i.Quantity
                }).ToList()
            };

            await _orderReadRepository.UpsertAsync(readModel);

            return order.Id;
        }
    }
}
