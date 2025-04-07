import React, { useState, useEffect } from 'react';
import OfferForm from '../components/offers/OfferForm';
import OfferTable from '../components/offers/OfferTable';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../api/services/OffersServices';
import { getMerchants } from '../api/services/MerchantService';
import toast from 'react-hot-toast';

const Offer = () => {
    const [showForm, setShowForm] = useState(false);
    const [offers, setOffers] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const [editingOffer, setEditingOffer] = useState(null);
    const [formErrors, setFormErrors] = useState(null);
    const [formData, setFormData] = useState(null);

    const fetchOffers = async () => {
        try {
            const data = await getOffers();
            setOffers(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
            toast.error('Failed to load offers');
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
            toast.error('Failed to load merchants');
        }
    };

    useEffect(() => {
        fetchOffers();
        fetchMerchants();
    }, []);

    const handleEdit = (row) => {
        setEditingOffer(row);
        setShowForm(true);
        setFormErrors(null);
        setFormData({
            title: row.title,
            description: row.description,
            discount_percentage: row.discount_percentage,
            offer_amount: row.offer_amount,
            valid_from: row.valid_from,
            valid_until: row.valid_until,
            merchant_id: row.merchant_id,
        });
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete offer "${row.title}"?`)) {
            try {
                await deleteOffer(row.id);
                fetchOffers();
                toast.success('Offer deleted successfully');
            } catch (error) {
                console.error('Error deleting offer:', error);
                toast.error('Failed to delete offer');
            }
        }
    };

    const handleFormDataChange = (newFormData) => {
        setFormData(newFormData);
    };

    const handleSubmit = async (e, submittedFormData) => {
        e.preventDefault();

        const payload = {
            title: submittedFormData.title,
            description: submittedFormData.description,
            discount_percentage: parseFloat(submittedFormData.discount_percentage),
            offer_amount: parseFloat(submittedFormData.offer_amount),
            valid_from: submittedFormData.valid_from,
            valid_until: submittedFormData.valid_until,
            merchant_id: submittedFormData.merchant_id,
        };

        try {
            if (editingOffer) {
                await updateOffer(editingOffer.id, payload);
                toast.success('Offer updated successfully');
            } else {
                await createOffer(payload);
                toast.success('Offer created successfully');
            }
            setShowForm(false);
            setEditingOffer(null);
            setFormErrors(null);
            setFormData(null);
            fetchOffers();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Handle validation errors
                setFormErrors(error.response.data.errors);
                toast.error('Please fix the form errors');

                // Only clear fields that have errors
                const updatedFormData = { ...submittedFormData };
                Object.keys(error.response.data.errors).forEach(field => {
                    updatedFormData[field] = '';
                });
                setFormData(updatedFormData);
            } else {
                console.error('Error saving offer:', error);
                toast.error('Failed to save offer');
            }
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
                        setFormErrors(null);
                        setFormData({
                            title: '',
                            description: '',
                            discount_percentage: '',
                            offer_amount: '',
                            valid_from: '',
                            valid_until: '',
                            merchant_id: '',
                        });
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
                    setFormErrors(null);
                    setFormData(null);
                }}
                onSubmit={handleSubmit}
                editingOffer={editingOffer}
                merchants={merchants}
                errors={formErrors}
                formData={formData}
                onFormDataChange={handleFormDataChange}
            />
        </div>
    );
};

export default Offer;