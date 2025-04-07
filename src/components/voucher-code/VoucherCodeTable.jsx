import React, { useState } from 'react';
import DataTable from '../ui/DataTable';

const VoucherCodeTable = ({ data, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch {
            return 'Invalid Date';
        }
    };

    const formatStatus = (status) => {
        const statusValue = status?.toLowerCase() || 'expired';
        return (
            <span className={`status-badge ${statusValue === 'active' ? 'active' : 'expired'}`}>
                {statusValue}
            </span>
        );
    };

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((o, p) => (o || {})[p], obj);
    };

    const columns = [
        { key: 'serial', label: 'SL No' },
        {
            key: 'code',
            label: 'Code',
            render: (value) => value || 'N/A'
        },
        {
            key: 'offer.title',
            label: 'Offer',
        },
        {
            key: 'valid_date',
            label: 'Valid Date',
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

    const filteredData = data.filter(voucher => {
        if (statusFilter !== 'all' && voucher.status?.toLowerCase() !== statusFilter) {
            return false;
        }

        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            (voucher.code?.toLowerCase()?.includes(searchLower)) ||
            (getNestedValue(voucher, 'offer.title')?.toLowerCase()?.includes(searchLower) ||
                formatDate(voucher.valid_date)?.toLowerCase()?.includes(searchLower) ||
                (voucher.status?.toLowerCase()?.includes(searchLower))
            ));
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
                            placeholder="Search voucher codes..."
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
                emptyMessage="No voucher codes found"
            />
        </div>
    );
};

export default VoucherCodeTable;