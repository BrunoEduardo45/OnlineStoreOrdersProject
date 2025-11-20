import { Button, Container, Row, Col } from 'react-bootstrap'; 

export default function Home() {
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 pt-5">
        <Row className="text-center mb-5">
          <Col>
            <h1 className="display-4 font-weight-bold text-dark">Bem-vindo ao Sistema de Pedidos</h1>
          </Col>
        </Row>
        <Row className="text-center w-50">
          <Col sm={6} className="mb-3">
            <Button variant="outline-secondary" size="lg" href="/products" className="w-100">Ver Produtos</Button>
          </Col>
          <Col sm={6} className="mb-3">
            <Button variant="outline-secondary" size="lg" href="/orders" className="w-100">Ver Pedidos</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
