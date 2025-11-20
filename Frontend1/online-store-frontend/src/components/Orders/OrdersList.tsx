import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosClient";
import type { Order } from "../../api/types";
import { Link } from "react-router-dom";

export default function OrdersList() {
    const { data, isLoading, error } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await api.get("/api/orders");
            console.log(res.data);
            return res.data;
        },
    });

    if (isLoading) return <p>Carregando pedidos...</p>;
    if (error) return <p>Erro ao carregar pedidos.</p>;

    return (
        <div>
            <h2>Pedidos</h2>

            {!data?.length && <p>Nenhum pedido encontrado.</p>}

            <ul>
                {data?.map((order) => (
                    <li key={order.id}>
                        <Link to={`/orders/${order.id}`}>
                            Pedido #{order.id} — {order.orderDate?.slice(0, 10)} <br />
                            Cliente: {order.customerName} <br />
                            Status: {order.status} <br />
                            <p>Total: R$ {order.totalAmount ?? 0}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
