import React, { useState, useEffect } from 'react';
import VoucherCodeTable from '../components/voucher-code/VoucherCodeTable';
import VoucherCodeForm from '../components/voucher-code/VoucherCodeForm';
import { getVoucherCodes, createVoucherCode, updateVoucherCode, deleteVoucherCode } from '../api/services/VoucherCodeService';
import { getOffers } from '../api/services/OffersServices';
import toast from 'react-hot-toast';
import { generateVoucherCode } from '../utils/voucherUtils';

const VoucherCode = () => {
    const [showForm, setShowForm] = useState(false);
    const [voucherCodes, setVoucherCodes] = useState([]);
    const [offers, setOffers] = useState([]);
    const [editingVoucherCode, setEditingVoucherCode] = useState(null);
    const [formErrors, setFormErrors] = useState(null);
    const [formData, setFormData] = useState(null);

    const fetchVoucherCodes = async () => {
        try {
            const data = await getVoucherCodes();
            setVoucherCodes(data);
        } catch (error) {
            console.error('Error fetching voucher codes:', error);
            toast.error('Failed to load voucher codes');
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
            toast.error('Failed to load offers');
        }
    };

    useEffect(() => {
        fetchVoucherCodes();
        fetchOffers();
    }, []);

    const handleEdit = (row) => {
        setEditingVoucherCode(row);
        setShowForm(true);
        setFormErrors(null);
        setFormData({
            code: row.code,
            valid_date: row.valid_date,
            offer_id: row.offer_id,
            status: row.status,
        });
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete voucher "${row.code}"?`)) {
            try {
                await deleteVoucherCode(row.id);
                fetchVoucherCodes();
                toast.success('Voucher code deleted successfully');
            } catch (error) {
                console.error('Error deleting voucher code:', error);
                toast.error('Failed to delete voucher code');
            }
        }
    };

    const handleFormDataChange = (newFormData) => {
        setFormData(newFormData);
    };

    const handleSubmit = async (e, submittedFormData) => {
        e.preventDefault();

        const payload = {
            code: submittedFormData.code,
            valid_date: submittedFormData.valid_date,
            offer_id: submittedFormData.offer_id,
            status: submittedFormData.status,
        };

        try {
            if (editingVoucherCode) {
                await updateVoucherCode(editingVoucherCode.id, payload);
                toast.success('Voucher code updated successfully');
            } else {
                await createVoucherCode(payload);
                toast.success('Voucher code created successfully');
            }
            setShowForm(false);
            setEditingVoucherCode(null);
            setFormErrors(null);
            setFormData(null);
            fetchVoucherCodes();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setFormErrors(error.response.data.errors);
                toast.error('Please fix the form errors');

                const updatedFormData = { ...submittedFormData };
                Object.keys(error.response.data.errors).forEach(field => {
                    updatedFormData[field] = '';
                });
                setFormData(updatedFormData);
            } else {
                console.error('Error saving voucher code:', error);
                toast.error('Failed to save voucher code');
            }
        }
    };

    const handleAddNew = () => {
        setEditingVoucherCode(null);
        setShowForm(true);
        setFormErrors(null);
        setFormData({
            code: generateVoucherCode(),
            valid_date: '',
            offer_id: '',
            status: 'active',
        });
    };

    return (
        <div>
            <header className="content-header">
                <h1>Voucher Codes</h1>
                <button
                    className="btn btn-primary"
                    onClick={handleAddNew}
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
                    setFormErrors(null);
                    setFormData(null);
                }}
                onSubmit={handleSubmit}
                offers={offers}
                errors={formErrors}
                formData={formData}
                onFormDataChange={handleFormDataChange}
            />
        </div>
    );
};

export default VoucherCode;