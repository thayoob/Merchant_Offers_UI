import React from 'react';
import ModalForm from '../ui/ModalForm';

const VoucherCodeForm = ({
    showForm,
    editingVoucherCode,
    onClose,
    onSubmit,
    offers,
    errors,
    formData,
    onFormDataChange
}) => {
    const formFields = [
        {
            label: 'Code',
            name: 'code',
            type: 'text',
            placeholder: 'Enter voucher unique code',
            required: true,
        },
        {
            label: 'Offers',
            name: 'offer_id',
            type: 'select',
            options: offers,
            required: true,
        },
        {
            label: 'Status',
            name: 'status',
            type: 'radio',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'expired', label: 'Expired' },
            ],
            required: true,
        },
    ];

    return (
        showForm && (
            <ModalForm
                title={editingVoucherCode ? 'Edit Voucher Code' : 'Add New Voucher Code'}
                onClose={onClose}
                onSubmit={onSubmit}
                fields={formFields}
                initialValues={formData || (editingVoucherCode || {})}
                apiErrors={errors}
                externalFormData={formData}
                onExternalChange={onFormDataChange}
            />
        )
    );
};

export default VoucherCodeForm;