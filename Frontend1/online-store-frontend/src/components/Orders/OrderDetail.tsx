import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axiosClient";
import type { Order } from "../../api/types";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // QUERY
  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await api.get(`/api/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // MUTATION
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/api/orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
    },
  });

  if (isLoading) return <p>Carregando pedido...</p>;
  if (error) return <p>Erro ao carregar pedido.</p>;
  if (!order) return <p>Pedido não encontrado.</p>;

  return (
    <div>
      <h2>Pedido #{order.id}</h2>

      <p>Data: {order.orderDate}</p>
      <p>Status: {order.status}</p>
      <p>Total: R$ {order.totalAmount?.toFixed(2)}</p>

      <h3>Itens</h3>
      <ul>
        {order.items?.map((it) => (
          <li key={it.productId}>
            {it.productName} — {it.quantity} x R$ {it.unitPrice}
          </li>
        ))}
      </ul>

      <button onClick={() => deleteMutation.mutate()}>
        Excluir Pedido
      </button>
    </div>
  );
}
