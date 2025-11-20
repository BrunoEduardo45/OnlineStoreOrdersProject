import axiosClient from "./axiosClient";
import type { Product } from "./types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosClient.get("/api/products");
  return res.data;
};
