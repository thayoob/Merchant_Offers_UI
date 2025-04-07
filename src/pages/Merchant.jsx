import React, { useState, useEffect } from 'react';
import MerchantForm from '../components/merchants/MerchantForm';
import MerchantTable from '../components/merchants/MerchantTable';
import { getMerchants, createMerchant, updateMerchant, deleteMerchant } from '../api/services/MerchantService';
import toast from 'react-hot-toast';

const Merchant = () => {
    const [showForm, setShowForm] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [editingMerchant, setEditingMerchant] = useState(null);
    const [formErrors, setFormErrors] = useState(null);
    const [formData, setFormData] = useState(null);

    const fetchMerchants = async () => {
        try {
            const data = await getMerchants();
            setMerchants(data);
        } catch (error) {
            console.error('Error fetching merchants:', error);
            toast.error('Failed to load merchants');
        }
    };

    useEffect(() => {
        fetchMerchants();
    }, []);

    const handleEdit = (row) => {
        setEditingMerchant(row);
        setShowForm(true);
        setFormErrors(null);
        setFormData({
            name: row.name,
            email: row.email,
            contact_number: row.contact_number,
            address: row.address,
            status: row.status
        });
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
            try {
                await deleteMerchant(row.id);
                fetchMerchants();
                toast.success('Merchant deleted successfully');
            } catch (error) {
                console.error('Error deleting merchant:', error);
                toast.error('Failed to delete merchant');
            }
        }
    };

    const handleFormDataChange = (newFormData) => {
        setFormData(newFormData);
    };

    const handleSubmit = async (e, submittedFormData) => {
        e.preventDefault();
        const payload = {
            name: submittedFormData.name,
            email: submittedFormData.email,
            contact_number: submittedFormData.contact_number,
            address: submittedFormData.address,
            status: submittedFormData.status,
        };

        try {
            if (editingMerchant) {
                await updateMerchant(editingMerchant.id, payload);
                toast.success('Merchant updated successfully');
            } else {
                await createMerchant(payload);
                toast.success('Merchant created successfully');
            }
            setShowForm(false);
            setEditingMerchant(null);
            setFormErrors(null);
            setFormData(null);
            fetchMerchants();
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
                console.error('Error saving merchant:', error);
                toast.error('Failed to save merchant');
            }
        }
    };

    return (
        <div>
            <header className="content-header">
                <h1>Merchants</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEditingMerchant(null);
                        setShowForm(true);
                        setFormErrors(null);
                        setFormData({
                            name: '',
                            email: '',
                            contact_number: '',
                            address: '',
                            status: 'active'
                        });
                    }}
                >
                    Add Merchant
                </button>
            </header>

            <MerchantTable data={merchants} onEdit={handleEdit} onDelete={handleDelete} />

            <MerchantForm
                visible={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingMerchant(null);
                    setFormErrors(null);
                    setFormData(null);
                }}
                onSubmit={handleSubmit}
                editingMerchant={editingMerchant}
                errors={formErrors}
                formData={formData}
                onFormDataChange={handleFormDataChange}
            />
        </div>
    );
};

export default Merchant;