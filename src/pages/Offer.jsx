import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import ModalForm from '../components/ui/ModalForm';
import {
    getOffers,
    createOffer,
    updateOffer,
    deleteOffer
} from '../services/offersServices';
import { getMerchants } from '../services/merchantService';

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

    const columns = [
        'id',
        'title',
        'discount_percentage',
        'offer_amount',
        'valid_from',
        'valid_until',
        'merchant.name'
    ];

    const actions = [
        {
            label: 'Edit',
            className: 'btn-edit',
            onClick: (row) => {
                setEditingOffer(row);
                setShowForm(true);
            },
        },
        {
            label: 'Delete',
            className: 'btn-delete',
            onClick: async (row) => {
                if (window.confirm(`Are you sure you want to delete offer "${row.title}"?`)) {
                    await deleteOffer(row.id);
                    fetchOffers();
                }
            },
        },
    ];

    const formFields = [
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            placeholder: 'Enter offer title',
            required: true,
        },
        {
            label: 'Description',
            name: 'description',
            type: 'textarea',
            placeholder: 'Enter offer description',
            required: false,
        },
        {
            label: 'Discount Percentage',
            name: 'discount_percentage',
            type: 'number',
            placeholder: 'Enter discount %',
            required: true,
        },
        {
            label: 'Offer Amount',
            name: 'offer_amount',
            type: 'number',
            placeholder: 'Enter offer amount',
            required: true,
        },
        {
            label: 'Valid From',
            name: 'valid_from',
            type: 'date',
            required: true,
        },
        {
            label: 'Valid Until',
            name: 'valid_until',
            type: 'date',
            required: true,
        },
        {
            label: 'Merchant',
            name: 'merchant_id',
            type: 'select',
            options: merchants,
            required: true,
        },
    ];

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

            <DataTable columns={columns} data={offers} actions={actions} />

            {showForm && (
                <ModalForm
                    title={editingOffer ? 'Edit Offer' : 'Add New Offer'}
                    onClose={() => {
                        setShowForm(false);
                        setEditingOffer(null);
                    }}
                    onSubmit={handleSubmit}
                    fields={formFields}
                    initialValues={editingOffer || {}}
                />
            )}
        </div>
    );
};

export default Offer;
