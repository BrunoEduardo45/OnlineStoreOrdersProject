import type { CSSProperties } from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} — Online Store Orders</p>
    </footer>
  );
}

const styles: { footer: CSSProperties } = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
};
