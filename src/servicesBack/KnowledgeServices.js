import {api} from "./api";

export const getAllKnowledges = async (filterTitle, size, page, domainId, categoryId) => {
    try {
        const response = await api.get(`/knowledges`, {
            params: {
                ...(filterTitle ? {title: filterTitle} : {}),
                ...(domainId ? {domainId: domainId} : {}),
                ...(categoryId ? {categoryId: categoryId} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        });
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

export const getAllInactiveKnowledges = async (title, size, page, domainId, categoryId) => {
    try {
        const response = await api.get('/knowledges', {
            params: {
                active: false,
                ...(title ? {title: title} : {}),
                ...(domainId ? {domainId: domainId} : {}),
                ...(categoryId ? {categoryId: categoryId} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),

            }

        })
        return response
    } catch (error) {
        console.log("Erro ao buscar os conhecimentos inativos.", error)
    }
};

export const getAllNeedsReviewKnowledges = async (size, page) => {
    try {
        const response = await api.get(`/knowledges/review`, {
            params: {
                needsReview: true,
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        })
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