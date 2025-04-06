import React from 'react';
import DataTable from '../ui/DataTable';

const OfferTable = ({ data, onEdit, onDelete }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'discount_percentage', label: 'Discount' },
        { key: 'offer_amount', label: 'Amount' },
        { key: 'valid_from', label: 'Valid From' },
        { key: 'valid_until', label: 'Valid Until' },
        { key: 'merchant.name', label: 'Merchant' }
    ];

    const actions = [
        {
            label: 'Edit',
            className: 'btn-edit',
            onClick: onEdit,
        },
        {
            label: 'Delete',
            className: 'btn-delete',
            onClick: onDelete,
        },
    ];

    return <DataTable columns={columns} data={data} actions={actions} />;
};

export default OfferTable;