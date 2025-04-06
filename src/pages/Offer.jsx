import React, { useState, useEffect } from 'react';
import OfferForm from '../components/offers/OfferForm';
import OfferTable from '../components/offers/OfferTable';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../api/services/OffersServices';
import { getMerchants } from '../api/services/MerchantService';

const Offer = () => {
    const [showForm, setShowForm] = useState(false);
    const [offers, setOffers] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const [editingOffer, setEditingOffer] = useState(null);

    const fetchOffers = async () => {
        try {
            const data = await getOffers();
            setOffers(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const fetchMerchants = async () => {
        try {
            const data = await getMerchants();
            const formattedMerchants = data.map((merchant) => ({
                value: merchant.id,
                label: merchant.name,
            }));
            setMerchants(formattedMerchants);
        } catch (error) {
            console.error('Error fetching merchants:', error);
        }
    };

    useEffect(() => {
        fetchOffers();
        fetchMerchants();
    }, []);

    const handleEdit = (row) => {
        setEditingOffer(row);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete offer "${row.title}"?`)) {
            await deleteOffer(row.id);
            fetchOffers();
        }
    };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            description: formData.description,
            discount_percentage: parseFloat(formData.discount_percentage),
            offer_amount: parseFloat(formData.offer_amount),
            valid_from: formData.valid_from,
            valid_until: formData.valid_until,
            merchant_id: formData.merchant_id,
        };

        try {
            if (editingOffer) {
                await updateOffer(editingOffer.id, payload);
            } else {
                await createOffer(payload);
            }

            setShowForm(false);
            setEditingOffer(null);
            fetchOffers();
        } catch (error) {
            console.error('Error saving offer:', error);
        }
    };

    return (
        <div>
            <header className="content-header">
                <h1>Offers</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingOffer(null);
                        setShowForm(true);
                    }}
                >
                    Add Offer
                </button>
            </header>

            <OfferTable data={offers} onEdit={handleEdit} onDelete={handleDelete} />

            <OfferForm
                visible={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingOffer(null);
                }}
                onSubmit={handleSubmit}
                editingOffer={editingOffer}
                merchants={merchants}
            />
        </div>
    );
};

export default Offer;