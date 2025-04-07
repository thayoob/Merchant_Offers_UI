import React from 'react';
import ModalForm from '../ui/ModalForm';

const formFields = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'you@example.com',
        required: true
    },
    {
        label: 'Contact Number',
        name: 'contact_number',
        type: 'number',
        placeholder: 'Enter contact number',
        required: true
    },
    {
        label: 'Address',
        name: 'address',
        type: 'textarea',
        placeholder: 'Write Address...',
        required: false
    },
    {
        label: 'Status',
        name: 'status',
        type: 'radio',
        options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
        ],
        required: true
    },
];

const MerchantForm = ({ visible, onClose, onSubmit, editingMerchant, errors, formData, onFormDataChange }) => {
    return (
        <>
            {visible && (
                <ModalForm
                    title={editingMerchant ? 'Edit Merchant' : 'Add New Merchant'}
                    onClose={onClose}
                    onSubmit={onSubmit}
                    fields={formFields}
                    initialValues={formData || (editingMerchant || {})}
                    apiErrors={errors}
                    externalFormData={formData}
                    onExternalChange={onFormDataChange}
                />
            )}
        </>
    );
};

export default MerchantForm;