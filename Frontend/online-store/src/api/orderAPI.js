const API_URL = "https://localhost:7000/api";

// Obter todos os pedidos
export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) {
    throw new Error("Erro ao carregar pedidos");
  }
  return await response.json();
};

// Obter um pedido específico
export const getOrderById = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao carregar o pedido');
  }
  return await response.json();
};

// Criar um novo pedido
export const createOrder = async (order) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar pedido");
  }
  return await response.json(); 
};

// Atualizar um pedido
export const updateOrder = async (order) => {
  const response = await fetch(`${API_URL}/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar pedido");
  }
  return await response.json(); 
};

// Excluir um pedido
export const deleteOrder = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    if (response.status === 204) {
      return {};  
    } else {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } else {
    throw new Error("Erro ao excluir pedido");
  }
};



