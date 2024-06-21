import {api} from "./api";

<<<<<<< Updated upstream
export const getAllKnowledges = async (filterTitle = '', size, page, domainId, categoryId) => {
  try {
    const response = await api.get(`/knowledges?title=${filterTitle}&size=${size}&page=${page}&domainId=${domainId}&categoryId=${categoryId}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar conhecimentos', error);
  }
=======
export const getAllKnowledges = async (filterTitle = '', size, page) => {
    try {
        const response = await api.get(`/knowledges?title=${filterTitle}&size=${size}&page=${page}`);
        return response;
    } catch (error) {
        console.error('Erro ao buscar conhecimentos', error);
    }
>>>>>>> Stashed changes
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

export const getKnowledgeById = async (id) => {
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

<<<<<<< Updated upstream
export const getAllInactiveKnowledges = async (title, size, page, domainId, categoryId) => {
  try {
    const response = await api.get(`/knowledges?active=false&title=${title}&size=${size}&page=${page}&domainId=${domainId}&categoryId=${categoryId}`)
    return response
  } catch (error) {
    console.log("Erro ao buscar os conhecimentos inativos.", error)
  }
};
=======
export const getAllInactiveKnowledges = async (title, size, page) => {
    try {
        const response = await api.get(`/knowledges?active=false&title=${title}&size=${size}&page=${page}`)
        return response
    } catch (error) {
        console.log("Erro ao buscar os conhecimentos inativos.", error)
    }
};

export const getAllNeedsReviewKnowledges = async (title, size, page) => {
    try {
        const response = await api.get(`/knowledges/review?size=${size}&page=${page}`)
        return response
    } catch (error) {
        console.log("Erro ao buscar os conhecimentos para revisâo.", error)
    }
};
export const acceptKnowledge = async (id) => {
    try {
        const response = await api.put(`/knowledges/accept/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao revisar conhecimento.', error);
    }
};
>>>>>>> Stashed changes
