import axiosClient from "./axiosClient";
import type { Order } from "./types";

export const getOrders = async (): Promise<Order[]> => {
  const res = await axiosClient.get("/api/orders");
  return res.data;
};

export const getOrderById = async (id: string | number): Promise<Order> => {
  const res = await axiosClient.get(`/api/orders/${id}`);
  return res.data;
};

export const createOrder = async (payload: Order): Promise<Order> => {
  const res = await axiosClient.post("/api/orders", payload);
  return res.data;
};

export const updateOrder = async (id: string | number, payload: Order): Promise<Order> => {
  const res = await axiosClient.put(`/api/orders/${id}`, payload);
  return res.data;
};

export const deleteOrder = async (id: string | number): Promise<void> => {
  await axiosClient.delete(`/api/orders/${id}`);
};
