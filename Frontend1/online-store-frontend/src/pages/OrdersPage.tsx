
import React from "react";
import OrdersList from "../components/Orders/OrdersList";
import OrderForm from "../components/Orders/OrderForm";

export default function OrdersPage() {
  return (
    <div>
      <h1>Pedidos</h1>
      <OrderForm />
      <hr />
      <OrdersList />
    </div>
  );
}
