import apiService from '../ApiService';

const endpoint = '/voucher-codes';

export const getVoucherCodes = async () => {
    const data = await apiService.getAll(endpoint);
    return data.voucher_codes;
};

export const getVoucherCodeById = async (id) => {
    const data = await apiService.getById(endpoint, id);
    return data.voucher_codes;
};

export const createVoucherCode = (voucherCodesData) => apiService.create(endpoint, voucherCodesData);

export const updateVoucherCode = (id, voucherCodesData) => apiService.update(endpoint, id, voucherCodesData);

export const deleteVoucherCode = (id) => apiService.remove(endpoint, id);
