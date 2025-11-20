export interface Product {
  id: string | number;
  name: string;
  price: number;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Cancelled"
  | string;

export interface OrderItem {
  id?: string | number;
  orderId?: string | number;
  productId: string | number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  orderDate: string;
  status: string;
  items: OrderItem[];
}

