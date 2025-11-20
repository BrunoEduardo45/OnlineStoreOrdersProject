import type { Product } from "../../api/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: 10,
  },
};
