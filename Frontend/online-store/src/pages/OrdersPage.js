import React, { useEffect, useState, useCallback } from 'react';
import { getOrders, deleteOrder, createOrder, updateOrder } from '../api/orderAPI';
import { Container, Table, Button, Modal, Form, Badge, Row, Col, InputGroup } from 'react-bootstrap';
import { getProducts } from '../api/productAPI';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ productId: '', quantity: 1, status: 'Pending' });
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [filterId, setFilterId] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Carregar pedidos
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Carregar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filtrar pedidos por ID
  useEffect(() => {
    if (filterId.trim()) {
      setFilteredOrders(orders.filter(o => o.id.includes(filterId.trim())));
    } else {
      setFilteredOrders(orders);
    }
  }, [orders, filterId]);

  // Obter variante do status
  const getStatusVariant = useCallback((status) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Shipped': return 'info';
      case 'Delivered': return 'success';
      case 'Canceled': return 'danger';
      default: return 'dark';
    }
  }, []);

  // Abrir modal de adicionar pedido
  const handleAddClick = useCallback(() => {
    setNewOrder({ productId: '', quantity: 1, status: 'Pending' });
    setOrderToEdit(null);
    setShowModal(true);
  }, []);

  // Abrir modal de detalhes
  const handleDetailsClick = useCallback((order) => {
    setOrderToEdit(order);
    setShowDetailsModal(true);
  }, []);

  // Abrir modal de exclusão
  const handleDeleteClick = useCallback((order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  }, []);

  // Fechar modal de edição/adicionar
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setNewOrder({ productId: '', quantity: 1, status: 'Pending' });
    setOrderToEdit(null);
  }, []);

  // Fechar modal de detalhes
  const handleCloseDetailsModal = useCallback(() => {
    setShowDetailsModal(false);
    setOrderToEdit(null);
  }, []);

  // Fechar modal de exclusão
  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  }, []);

  // Mudanças nos inputs
  const handleProductChange = useCallback((e) => {
    const value = e.target.value;
    if (orderToEdit) {
      setOrderToEdit(prev => ({ ...prev, productId: value }));
    } else {
      setNewOrder(prev => ({ ...prev, productId: value }));
    }
  }, [orderToEdit]);

  // Quantidade
  const handleQuantityChange = useCallback((e) => {
    const value = e.target.value;
    if (orderToEdit) {
      setOrderToEdit(prev => ({ ...prev, quantity: value }));
    } else {
      setNewOrder(prev => ({ ...prev, quantity: value }));
    }
  }, [orderToEdit]);

  // Status
  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    if (orderToEdit) {
      setOrderToEdit(prev => ({ ...prev, status: value }));
    } else {
      setNewOrder(prev => ({ ...prev, status: value }));
    }
  }, [orderToEdit]);

  // Filtro
  const handleFilterChange = useCallback((e) => {
    setFilterId(e.target.value);
  }, []);

  // Limpar filtro
  const handleClearFilter = useCallback(() => {
    setFilterId('');
  }, []);

  // Adicionar pedido
  const AddOrder = useCallback(async () => {
    try {
      await createOrder({
        items: [{ productId: newOrder.productId, quantity: parseInt(newOrder.quantity) }],
        status: newOrder.status
      });
      handleCloseModal();
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  }, [newOrder, handleCloseModal]);

  // Editar pedido
  const EditOrder = useCallback(async () => {
    try {
      await updateOrder({
        id: orderToEdit.id,
        items: [{ productId: orderToEdit.productId, quantity: parseInt(orderToEdit.quantity) }],
        status: orderToEdit.status
      });
      handleCloseModal();
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao editar pedido:', error);
    }
  }, [orderToEdit, handleCloseModal]);

  // Excluir pedido
  const DeleteOrder = useCallback(async () => {
    try {
      const response = await deleteOrder(orderToDelete.id);
      if (response.success) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
        handleCloseDeleteModal();
      } else {
        console.error('Falha na exclusão do pedido:', response.message);
      }
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  }, [orderToDelete, handleCloseDeleteModal]);

  // Submit do formulário
  const handleSubmit = useCallback(() => {
    if (orderToEdit) {
      EditOrder();
    } else {
      AddOrder();
    }
  }, [orderToEdit, EditOrder, AddOrder]);

  return (
    <Container>
      <h1 className="text-center mt-5">Pedidos</h1>
      <h5 className="text-center mb-5">Dados vindos do MongoDB (Orders Read)</h5>

      <Row className="mb-4">
        <Col className="d-grid" md={6} lg={6}>
          <Button variant="success" onClick={handleAddClick}>
            Adicionar Pedido
          </Button>
        </Col>
        <Col md={6} lg={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Filtrar pelo id do pedido..."
              value={filterId}
              onChange={handleFilterChange}
            />
            <Button variant="outline-secondary" onClick={handleClearFilter}>
              Limpar
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {loading ? <p>Carregando...</p> : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Status</th>
                <th className="w-25">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>{item.productName || 'Produto não especificado'}</div>
                    ))}
                  </td>
                  <td>
                    {order.items.map((item, i) => (
                      <div key={i}>{item.quantity}</div>
                    ))}
                  </td>
                  <td>R$ {order.totalAmount?.toFixed(2) || '0.00'}</td>
                  <td>
                    <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleDetailsClick(order)}
                      className="w-auto me-2"
                    >
                      Detalhes
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(order)}
                      className="w-auto"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal de Adicionar/Editar */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{orderToEdit ? 'Editar Pedido' : 'Novo Pedido'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProduct" className="mb-3">
                  <Form.Label>Produto</Form.Label>
                  <Form.Control
                    as="select"
                    value={orderToEdit ? orderToEdit.productId : newOrder.productId}
                    onChange={handleProductChange}
                  >
                    <option value="">Selecione um produto</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - R$ {product.price?.toFixed(2)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formQuantity" className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={orderToEdit ? orderToEdit.quantity : newOrder.quantity}
                    onChange={handleQuantityChange}
                  />
                </Form.Group>

                <Form.Group controlId="formStatus" className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={orderToEdit ? orderToEdit.status : newOrder.status}
                    onChange={handleStatusChange}
                  >
                    <option value="Pending">Pendente</option>
                    <option value="Shipped">Enviado</option>
                    <option value="Delivered">Entregue</option>
                    <option value="Canceled">Cancelado</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                {orderToEdit ? 'Atualizar Pedido' : 'Adicionar Pedido'}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal de Detalhes */}
          <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
            <Modal.Header closeButton>
              <Modal.Title>Detalhes do Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <h5 className="mb-3">Informações do Pedido</h5>
                <p><strong>ID do Pedido:</strong> {orderToEdit?.id}</p>
                <p><strong>Cliente:</strong> {orderToEdit?.customerName}</p>
                <p><strong>Status:</strong> {orderToEdit?.status}</p>
                <p><strong>Total:</strong> R$ {orderToEdit?.totalAmount?.toFixed(2) || '0.00'}</p>

                <h5 className="mt-4 mb-3">Itens do Pedido</h5>
                <ul className="list-group">
                  {orderToEdit?.items.map((item, index) => {
                    const product = products.find(p => p.name === item.productName);
                    const productPrice = product ? product.price : 0;

                    return (
                      <li key={index} className="list-group-item">
                        <p><strong>Produto:</strong> {item.productName || 'Produto não especificado'}</p>
                        <p><strong>Quantidade:</strong> {item.quantity}</p>
                        <p><strong>Preço Unitário:</strong> R$ {productPrice.toFixed(2)}</p>
                        <p><strong>Total do Item:</strong> R$ {(productPrice * item.quantity).toFixed(2)}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetailsModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal de Confirmação de Exclusão */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir o pedido de <strong>{orderToDelete?.customerName}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={DeleteOrder}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </Container>
  );
}
