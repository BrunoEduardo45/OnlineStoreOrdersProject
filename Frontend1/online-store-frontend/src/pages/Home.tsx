export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao Sistema de Pedidos</h1>
      <p style={styles.subtitle}>Gerencie seus produtos e pedidos de maneira fácil e rápida.</p>
      <div style={styles.buttonContainer}>
        <a href="/products" style={styles.button}>Ver Produtos</a>
        <a href="/orders" style={styles.button}>Ver Pedidos</a>
      </div>
    </div>
  );
}


const styles = {
  container: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // minHeight: "100vh",
    // background: "linear-gradient(135deg, #6c5ce7, #00b894)",
    // textAlign: "center",
    // color: "#fff",
    padding: "20px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    backgroundColor: "#fff",
    color: "#6c5ce7",
    padding: "12px 25px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    borderRadius: "25px",
    textDecoration: "none",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#6c5ce7",
    color: "#fff",
    transform: "scale(1.1)",
  },
};
