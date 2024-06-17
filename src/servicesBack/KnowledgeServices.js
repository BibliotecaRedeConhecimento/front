import { api } from "./api";

export const getAllKnowledges = async (filterTitle = '') => {
  try {
    const response = await api.get(`/knowledges?title=${filterTitle}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar conhecimentos', error);
  }
};

export const addKnowledge = async (knowledge) => {
  try {
    const response = await api.post('/knowledges', knowledge);
    return response;
  } catch (error) {
    console.error('Erro ao adicionar conhecimento', error)
  }
};

export const updateKnowledge = async (id, knowledge) => {
  try {
    const response = await api.put(`/knowledges/${id}`, knowledge);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar conhecimento', error);
  }
};

export const deleteKnowledge = async (id) => {
  try {
    const response = await api.delete(`/knowledges/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar conhecimento', error);
  }
};

export const getKnowledgeById =async (id) =>{
  try {
    const response = await api.get(`/knowledges/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar o conhecimento', error);
  }
}

export const inactivateKnowledge = async (id) => {
  try {
    const response = await api.put(`/knowledges/activate/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao inativar/ativar conhecimento.', error);
  }
};

export const getAllInactiveKnowledges = async () => {
  try{
    const response = await api.get('/knowledges?active=false')
    return response
  }catch(error){
    console.log("Erro ao buscar os conhecimentos inativos.", error)
  }
};