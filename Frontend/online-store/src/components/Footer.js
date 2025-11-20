export default function Footer() {
  return (
    <footer
      className="bg-dark text-white text-center p-4"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 99
      }}
    >
      <p className="m-0">
        © {new Date().getFullYear()} — Online Store Orders
      </p>
    </footer>
  );
}
