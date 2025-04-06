import apiService from '../ApiService';

const endpoint = '/offers';

export const getOffers = async () => {
    const data = await apiService.getAll(endpoint);
    return data.offers;
};

export const getOfferById = async (id) => {
    const data = await apiService.getById(endpoint, id);
    return data.offers;
};

export const createOffer = (offerData) => apiService.create(endpoint, offerData);

export const updateOffer = (id, offerData) => apiService.update(endpoint, id, offerData);

export const deleteOffer = (id) => apiService.remove(endpoint, id);
