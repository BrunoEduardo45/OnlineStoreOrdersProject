const API_URL = "https://localhost:7000/api"; 

// Obter todos
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Erro ao carregar produtos");
  }
  return await response.json();
};

// produto por ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`); 
  if (!response.ok) {
    throw new Error("Erro ao carregar produto");
  }
  return await response.json();
};

// Criar
export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }
  return await response.json();
};

// Atualizar
export const updateProduct = async (product) => {
  const response = await fetch(`${API_URL}/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }
  return await response.json();
};

// Excluir
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    if (response.status === 204) {
      return { success: true }; 
    } else {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } else {
    throw new Error("Erro ao excluir produto");
  }
};


