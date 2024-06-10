import { api } from "./api";

export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
  }
};

export const addCategory = async (category) => {
  try {
    const response = await api.post('/categories', category);
    return response;
  } catch (error) {
    console.error('Erro ao adicionar categoria', error)
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/categories/${id}`, category);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar categoria', error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar categoria', error);
  }
};

export const getCategoryById =async (id) =>{
  try {
    const response = await api.get(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar a categoria', error);
  }
}