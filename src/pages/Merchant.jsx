import React, { useState, useEffect } from 'react';
import MerchantForm from '../components/merchants/MerchantForm';
import MerchantTable from '../components/merchants/MerchantTable';
import { getMerchants, createMerchant, updateMerchant, deleteMerchant, } from '../api/services/MerchantService';

const Merchant = () => {
    const [showForm, setShowForm] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [editingMerchant, setEditingMerchant] = useState(null);

    const fetchMerchants = async () => {
        try {
            const data = await getMerchants();
            setMerchants(data);
        } catch (error) {
            console.error('Error fetching merchants:', error);
        }
    };

    useEffect(() => {
        fetchMerchants();
    }, []);

    const handleEdit = (row) => {
        setEditingMerchant(row);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
            await deleteMerchant(row.id);
            fetchMerchants();
        }
    };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        const payload = {
            name: formData.name,
            email: formData.email,
            contact_number: formData.contact_number,
            address: formData.address,
            status: formData.status,
        };

        try {
            if (editingMerchant) {
                await updateMerchant(editingMerchant.id, payload);
            } else {
                await createMerchant(payload);
            }
            setShowForm(false);
            setEditingMerchant(null);
            fetchMerchants();
        } catch (error) {
            console.error('Error saving merchant:', error);
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
                }}
                onSubmit={handleSubmit}
                editingMerchant={editingMerchant}
            />
        </div>
    );
};

export default Merchant;
