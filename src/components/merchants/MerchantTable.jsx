import React, { useState } from 'react';
import DataTable from '../ui/DataTable';

const MerchantTable = ({ data, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatStatus = (status) => {
        return (
            <span className={`status-badge ${status === 'active' ? 'active' : 'inactive'}`}>
                {status}
            </span>
        );
    };

    const columns = [
        { key: 'serial', label: 'SL No' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'contact_number', label: 'Contact Number' },
        { key: 'address', label: 'Address' },
        {
            key: 'created_at',
            label: 'Created At',
            render: (value) => formatDate(value)
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => formatStatus(value)
        }
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

    const filteredData = data.filter(item => {
        if (statusFilter !== 'all' && item.status?.toLowerCase() !== statusFilter) {
            return false;
        }

        const searchLower = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower) ||
            item.contact_number.toLowerCase().includes(searchLower) ||
            item.address.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower)
        );
    });

    const dataWithSerial = filteredData.map((item, index) => ({
        serial: index + 1,
        ...item
    }));

    return (
        <div className="table-wrapper">
            <div className="table-header">
                <div className="filters-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search merchants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                    </div>
                    <div className="status-filter">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={dataWithSerial} actions={actions} />
        </div>
    );
};

export default MerchantTable;