import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm container-fluid">
      <div className="container p-3">
        <Navbar.Brand href="/">Online Store Orders</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Produtos</Nav.Link>
          <Nav.Link href="/orders">Pedidos</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}
