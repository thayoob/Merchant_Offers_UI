import React from 'react';
import DataTable from '../ui/DataTable';

const VoucherCodeTable = ({ data, onEdit, onDelete }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'code', label: 'Code' },
        { key: 'offer.title', label: 'Offer' },
        { key: 'valid_date', label: 'Valid Date' },
        { key: 'status', label: 'Status' }
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

export default VoucherCodeTable;
