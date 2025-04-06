import React, { useState, useEffect } from 'react';
import VoucherCodeTable from '../components/voucher-code/VoucherCodeTable';
import VoucherCodeForm from '../components/voucher-code/VoucherCodeForm';
import { getVoucherCodes, createVoucherCode, updateVoucherCode, deleteVoucherCode } from '../api/services/VoucherCodeService';
import { getOffers } from '../api/services/OffersServices';

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

    const handleEdit = (row) => {
        setEditingVoucherCode(row);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete voucher "${row.code}"?`)) {
            await deleteVoucherCode(row.id);
            fetchVoucherCodes();
        }
    };

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

            <VoucherCodeTable
                data={voucherCodes}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <VoucherCodeForm
                showForm={showForm}
                editingVoucherCode={editingVoucherCode}
                onClose={() => {
                    setShowForm(false);
                    setEditingVoucherCode(null);
                }}
                onSubmit={handleSubmit}
                offers={offers}
            />
        </div>
    );
};

export default VoucherCode;
