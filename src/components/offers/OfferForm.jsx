import React from 'react';
import ModalForm from '../ui/ModalForm';

const OfferForm = ({ visible, onClose, onSubmit, editingOffer, merchants }) => {
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

    return (
        <>
            {visible && (
                <ModalForm
                    title={editingOffer ? 'Edit Offer' : 'Add New Offer'}
                    onClose={onClose}
                    onSubmit={onSubmit}
                    fields={formFields}
                    initialValues={editingOffer || {}}
                />
            )}
        </>
    );
};

export default OfferForm;