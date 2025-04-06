import axios from './axios';

const apiService = {
    getAll: async (endpoint) => {
        const response = await axios.get(endpoint);
        return response.data.data;
    },

    getById: async (endpoint, id) => {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data.data;
    },

    create: async (endpoint, data) => {
        const response = await axios.post(endpoint, data);
        return response.data;
    },

    update: async (endpoint, id, data) => {
        const response = await axios.put(`${endpoint}/${id}`, data);
        return response.data;
    },

    remove: async (endpoint, id) => {
        const response = await axios.delete(`${endpoint}/${id}`);
        return response.data;
    },
};

export default apiService;
