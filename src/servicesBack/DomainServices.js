import {api} from "./api";

export const getAllDomains = async (filterName, size, page) => {
    try {
        const response = await api.get(`/domains`, {
            params: {
                ...(filterName ? {name: filterName} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        });
        return response;
    } catch (error) {
        console.error('Erro ao buscar dominio', error);
    }
};

export const addDomain = async (domain) => {
    try {
        const response = await api.post('/domains', domain);
        return response;
    } catch (error) {
        console.error('Erro ao adicionar dominio', error)
    }
};

export const updateDomain = async (id, domain) => {
    try {
        const response = await api.put(`/domains/${id}`, domain);
        return response;
    } catch (error) {
        console.error('Erro ao atualizar dominio', error);
    }
};

export const deleteDomain = async (id) => {
    try {
        const response = await api.delete(`/domains/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao deletar dominio', error);
    }
};

export const getDomainById = async (id) => {
    try {
        const response = await api.get(`/domains/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao buscar o dominio', error);
    }
}

export const inactivateDomain = async (id) => {
    try {
        const response = await api.put(`/domains/activate/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao inativar/ativar os domínios.', error);
    }
};

export const getAllInactiveDomain = async (filterName, size, page) => {
    try {
        const response = await api.get(`/domains`, {
            params: {
                active: false,
                ...(filterName ? {name: filterName} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        })
        return response
    } catch (error) {
        console.log("Erro ao buscar os domínios inativos.", error)
    }
};