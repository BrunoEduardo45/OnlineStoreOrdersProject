using OnlineStoreOrders.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace OnlineStoreOrders.Domain.Entities
{
    public class Order
    {
        public Guid Id { get; set; } 
        public Guid CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; private set; }
        public OrderStatus Status { get; set; }

        public List<OrderItem> Items { get; set; } = new();

        public void RecalculateTotal()
        {
            TotalAmount = Items.Sum(i => i.TotalPrice);
        }
    }
}
