import { api } from "./api";

export const getAllDomains = async () => {
  try {
    const response = await api.get('/domains');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
  }
};

export const addDomain = async (domain) => {
  try {
    const response = await api.post('/domains', domain);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar domain', error)
  }
};

export const updateDomain = async (id, domain) => {
  try {
    const response = await api.put(`/domains/${id}`, domain);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar domain', error);
  }
};

export const deleteDomain = async (id) => {
  try {
    const response = await api.delete(`/domains/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar domain', error);
  }
};

export const getCategoryById = () =>{
  
}