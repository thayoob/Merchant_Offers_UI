import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import ModalForm from '../components/ui/ModalForm';
import { getVoucherCodes, createVoucherCode, updateVoucherCode, deleteVoucherCode } from '../services/voucherCodeService';
import { getOffers } from '../services/offersServices';

const VoucherCode = () => {
    const [showForm, setShowForm] = useState(false);
    const [voucherCodes, setVoucherCodes] = useState([]);
    const [offers, setOffers] = useState([]);
    const [editingVoucherCode, setEditingVoucherCode] = useState(null);

    const fetchVoucherCodes = async () => {
        try {
            const data = await getVoucherCodes();
            setVoucherCodes(data);
        } catch (error) {
            console.error('Error fetching voucher codes:', error);
        }
    };

    const fetchOffers = async () => {
        try {
            const data = await getOffers();
            const formattedOffers = data.map((offer) => ({
                value: offer.id,
                label: offer.title,
            }));
            setOffers(formattedOffers);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    useEffect(() => {
        fetchVoucherCodes();
        fetchOffers();
    }, []);

    const columns = [
        'id',
        'code',
        'offer_id',
        'valid_date',
        'status',
    ];

    const actions = [
        {
            label: 'Edit',
            className: 'btn-edit',
            onClick: (row) => {
                setEditingVoucherCode(row);
                setShowForm(true);
            },
        },
        {
            label: 'Delete',
            className: 'btn-delete',
            onClick: async (row) => {
                if (window.confirm(`Are you sure you want to delete voucher "${row.code}"?`)) {
                    await deleteVoucherCode(row.id);
                    fetchVoucherCodes();
                }
            },
        },
    ];

    const formFields = [
        {
            label: 'Code',
            name: 'code',
            type: 'text',
            placeholder: 'Enter voucher unique code',
            required: true,
        },
        {
            label: 'Valid Date',
            name: 'valid_date',
            type: 'date',
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
                { value: 'inactive', label: 'Inactive' }
            ],
            required: true,
        },
    ];

    const handleSubmit = async (e, formData) => {
        e.preventDefault();

        const payload = {
            code: formData.code,
            valid_date: formData.valid_date,
            offer_id: formData.offer_id,
            status: formData.status,
        };

        try {
            if (editingVoucherCode) {
                await updateVoucherCode(editingVoucherCode.id, payload);
            } else {
                await createVoucherCode(payload);
            }

            setShowForm(false);
            setEditingVoucherCode(null);
            fetchVoucherCodes();
        } catch (error) {
            console.error('Error saving voucher code:', error);
        }
    };

    return (
        <div>
            <header className="content-header">
                <h1>Voucher Codes</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingVoucherCode(null);
                        setShowForm(true);
                    }}
                >
                    Add Voucher Code
                </button>
            </header>

            <DataTable columns={columns} data={voucherCodes} actions={actions} />

            {showForm && (
                <ModalForm
                    title={editingVoucherCode ? 'Edit Voucher Code' : 'Add New Voucher Code'}
                    onClose={() => {
                        setShowForm(false);
                        setEditingVoucherCode(null);
                    }}
                    onSubmit={handleSubmit}
                    fields={formFields}
                    initialValues={editingVoucherCode || {}}
                />
            )}
        </div>
    );
};

export default VoucherCode;
