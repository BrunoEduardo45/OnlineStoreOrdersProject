namespace OnlineStoreOrders.Domain.ReadModels
{
    public class OrderReadModel
    {
        public Guid Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = null!;
        public List<OrderItemReadModel> Items { get; set; } = new();
    }

    public class OrderItemReadModel
    {
        public string ProductName { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Total { get; set; }
    }
}
