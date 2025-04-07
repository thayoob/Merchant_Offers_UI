import React, { useState } from 'react';
import DataTable from '../ui/DataTable';

const OfferTable = ({ data, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatStatus = (status) => {
        return (
            <span className={`status-badge ${status === 'active' ? 'active' : 'expired'}`}>
                {status}
            </span>
        );
    };

    const columns = [
        { key: 'serial', label: 'SL No' },
        { key: 'title', label: 'Title' },
        {
            key: 'discount_percentage',
            label: 'Discount',
            render: (value) => value ? `${value}%` : 'N/A'
        },
        {
            key: 'offer_amount',
            label: 'Amount',
            render: (value) => value ? `$${parseFloat(value).toFixed(2)}` : 'N/A'
        },
        {
            key: 'valid_from',
            label: 'Valid From',
            render: (value) => formatDate(value)
        },
        {
            key: 'valid_until',
            label: 'Valid Until',
            render: (value) => formatDate(value)
        },
        {
            key: 'merchant',
            label: 'Merchant',
            render: (value) => value?.name || 'N/A'
        },
        {
            key: 'voucher_codes',
            label: 'Voucher Codes',
            render: (value) => {
                if (!value || value.length === 0) return 'N/A';
                return (
                    <ul>
                        {value.map((code, index) => (
                            <li key={index}>{code.code}</li>
                        ))}
                    </ul>
                );
            }
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

    const filteredData = data.filter(offer => {
        if (statusFilter !== 'all' && offer.status?.toLowerCase() !== statusFilter) {
            return false;
        }

        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            (offer.title?.toLowerCase()?.includes(searchLower)) ||
            (offer.discount_percentage?.toString()?.includes(searchLower)) ||
            (offer.offer_amount?.toString()?.includes(searchLower)) ||
            (offer.merchant?.name?.toLowerCase()?.includes(searchLower)) ||
            formatDate(offer.valid_from)?.toLowerCase()?.includes(searchLower) ||
            formatDate(offer.valid_until)?.toLowerCase()?.includes(searchLower)
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
                            placeholder="Search offers..."
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
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={dataWithSerial}
                actions={actions}
                emptyMessage="No offers found"
            />
        </div>
    );
};

export default OfferTable;