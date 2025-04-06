import axios from '../api/axios';

export const getVoucherCodes = async () => {
    const response = await axios.get('/voucher-codes');
    return response.data.data.voucher_codes;
};

export const getVoucherCodeById = async (id) => {
    const response = await axios.get(`/voucher-codes/${id}`);
    return response.data.data.voucher_codes;
};

export const createVoucherCode = async (voucherCodesData) => {
    const response = await axios.post('/voucher-codes', voucherCodesData);
    return response.data;
};

export const updateVoucherCode = async (id, voucherCodesData) => {
    const response = await axios.put(`/voucher-codes/${id}`, voucherCodesData);
    return response.data;
};

export const deleteVoucherCode = async (id) => {
    const response = await axios.delete(`/voucher-codes/${id}`);
    return response.data;
};
