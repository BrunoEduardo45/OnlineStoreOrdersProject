import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axiosClient";
import type { Order, Product } from "../../api/types";

export default function OrderForm() {
  const queryClient = useQueryClient();

  // GET PRODUCTS
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/api/products");
      return res.data;
    },
  });

  // FORM SETUP
  const { register, control, handleSubmit, setValue } = useForm<Order>({
    defaultValues: {
      status: "Pending",
      items: [
        { productId: "", productName: "", quantity: 1, unitPrice: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // CREATE ORDER MUTATION
  const createOrder = useMutation({
    mutationFn: async (payload: Order) => {
      const res = await api.post("/api/orders", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // SUBMIT
  const onSubmit = (data: Order) => {
    const total = data.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    data.totalAmount = total;
    data.orderDate = new Date().toISOString();

    createOrder.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Novo Pedido</h3>

      <div>
        <label>Status</label>
        <input {...register("status")} />
      </div>

      <h4>Itens</h4>

      {fields.map((field, index) => (
        <div key={field.id}>
          <select
            {...register(`items.${index}.productId`)}
            onChange={(e) => {
              const selected = products?.find(
                (p) => String(p.id) === e.target.value
              );
              if (selected) {
                setValue(`items.${index}.productName`, selected.name);
                setValue(`items.${index}.unitPrice`, selected.price);
              }
            }}
          >
            <option value="">Selecione um produto</option>
            {products?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — R$ {p.price}
              </option>
            ))}
          </select>

          <input
            placeholder="Nome"
            {...register(`items.${index}.productName`)}
          />

          <input
            type="number"
            placeholder="Qtd"
            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
          />

          <input
            type="number"
            placeholder="Preço"
            {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
          />

          <button type="button" onClick={() => remove(index)}>
            Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            productId: "",
            productName: "",
            quantity: 1,
            unitPrice: 0,
          })
        }
      >
        + Item
      </button>

      <br />
      <br />

      <button type="submit">Criar Pedido</button>
    </form>
  );
}
