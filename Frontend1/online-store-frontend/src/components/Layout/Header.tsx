import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h2>Online Store</h2>
      </div>

      <nav>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/products" style={styles.navLink}>Produtos</Link>
        <Link to="/orders" style={styles.navLink}>Pedidos</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 50px",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  navLink: {
    color: "#fff",
    marginLeft: "20px",
    fontSize: "1.1rem",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  navLinkHover: {
    color: "#00b894",
  },
};
