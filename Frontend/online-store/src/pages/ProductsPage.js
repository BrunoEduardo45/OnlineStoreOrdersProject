import React, { useEffect, useState, useCallback } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../api/productAPI';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Nome
  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    if (productToEdit) {
      setProductToEdit(prev => ({ ...prev, name: value }));
    } else {
      setNewProduct(prev => ({ ...prev, name: value }));
    }
  }, [productToEdit]);

  // Preço
  const handlePriceChange = useCallback((e) => {
    const value = e.target.value;
    if (productToEdit) {
      setProductToEdit(prev => ({ ...prev, price: value }));
    } else {
      setNewProduct(prev => ({ ...prev, price: value }));
    }
  }, [productToEdit]);

  // Editar produto
  const handleEditClick = useCallback((product) => {
    setProductToEdit(product);
    setShowModal(true);
  }, []);

  // Excluir produto 
  const handleDeleteClick = useCallback((product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  }, []);

  // Adicionar produto
  const AddProduct = async () => {
    try {
      await createProduct(newProduct);
      setShowModal(false);
      setNewProduct({ name: '', price: '' });
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  // Editar produto
  const EditProduct = async () => {
    try {
      await updateProduct(productToEdit);
      setShowModal(false);
      setProductToEdit(null);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  // Confirmar a exclusão
  const DeleteProduct = async () => {
    try {
      const response = await deleteProduct(productToDelete.id);

      if (response.success) {
        console.log('Produto excluído com sucesso');
        setShowDeleteModal(false);
        setProductToDelete(null);
        const data = await getProducts();
        setProducts(data);
      } else {
        console.error('Falha na exclusão do produto:', response.message);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-5">Produtos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <Button className='mb-4 w-50' variant="success" onClick={() => setShowModal(true)}>
            Adicionar Produto
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Preço</th>
                <th className="w-25">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>R$ {product.price}</td>
                  <td className="d-flex justify-content-between gap-2">
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(product)}
                      className='w-100'
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(product)}
                      className='w-100'
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{productToEdit ? 'Editar Produto' : 'Novo Produto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do produto"
                    value={productToEdit ? productToEdit.name : newProduct.name}
                    onChange={handleNameChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Preço do produto"
                    value={productToEdit ? productToEdit.price : newProduct.price}
                    onChange={handlePriceChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Fechar
              </Button>
              <Button
                variant="primary"
                onClick={productToEdit ? EditProduct : AddProduct}
              >
                {productToEdit ? 'Atualizar Produto' : 'Adicionar Produto'}
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir o produto <strong>{productToDelete?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={DeleteProduct}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </Container>
  );
}