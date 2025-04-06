import axios from '../api/axios';

export const getMerchants = async () => {
    const response = await axios.get('/merchants');
    return response.data.data.merchants;
};

export const getMerchantById = async (id) => {
    const response = await axios.get(`/merchants/${id}`);
    return response.data.data.merchant;
};

export const createMerchant = async (merchantData) => {
    const response = await axios.post('/merchants', merchantData);
    return response.data;
};

export const updateMerchant = async (id, merchantData) => {
    const response = await axios.put(`/merchants/${id}`, merchantData);
    return response.data;
};

export const deleteMerchant = async (id) => {
    const response = await axios.delete(`/merchants/${id}`);
    return response.data;
};
