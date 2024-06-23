import {api} from "./api";

export const getAllCategories = async (filterName, size, page) => {
    try {
        const response = await api.get(`/categories`, {
            params: {
                ...(name ? {name: filterName} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        });
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

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao buscar a categoria', error);
    }
}

export const inactivateCategory = async (id) => {
    try {
        const response = await api.put(`/categories/activate/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao inativar/ativar as categorias.', error);
    }
};

export const getAllInactiveCategory = async (name, size, page) => {
    try {
        const response = await api.get(`/categories`, {
            params: {
                active: false,
                ...(name ? {name: filterName} : {}),
                ...(size ? {size: size} : {}),
                ...(page ? {page: page} : {}),
            }
        })
        return response
    } catch (error) {
        console.log("Erro ao buscar as categorias inativos.", error)
    }
};