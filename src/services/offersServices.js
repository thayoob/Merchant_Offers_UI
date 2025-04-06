import axios from '../api/axios';

export const getOffers = async () => {
    const response = await axios.get('/offers');
    return response.data.data.offers;
};

export const getOfferById = async (id) => {
    const response = await axios.get(`/offers/${id}`);
    return response.data.data.offers;
};

export const createOffer = async (offerData) => {
    const response = await axios.post('/offers', offerData);
    return response.data;
};

export const updateOffer = async (id, offerData) => {
    const response = await axios.put(`/offers/${id}`, offerData);
    return response.data;
};

export const deleteOffer = async (id) => {
    const response = await axios.delete(`/offers/${id}`);
    return response.data;
};
