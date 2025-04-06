import React from 'react';
import DataTable from '../ui/DataTable';

const MerchantTable = ({ data, onEdit, onDelete }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'contact_number', label: 'Contact Number' },
        { key: 'address', label: 'Address' },
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

export default MerchantTable;
