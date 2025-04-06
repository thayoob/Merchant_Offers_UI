import apiService from '../ApiService';

const endpoint = '/merchants';

export const getMerchants = async () => {
    const data = await apiService.getAll(endpoint);
    return data.merchants;
};

export const getMerchantById = async (id) => {
    const data = await apiService.getById(endpoint, id);
    return data.merchant;
};

export const createMerchant = (merchantData) => apiService.create(endpoint, merchantData);

export const updateMerchant = (id, merchantData) => apiService.update(endpoint, id, merchantData);

export const deleteMerchant = (id) => apiService.remove(endpoint, id);
