import React, { useState, useEffect } from 'react';
import DataTable from '../components/ui/DataTable';
import ModalForm from '../components/ui/ModalForm';
import {
    getMerchants,
    createMerchant,
    updateMerchant,
    deleteMerchant,
} from '../services/merchantService';

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

    const columns = ['ID', 'Name', 'Email', 'Contact Number', 'Address', 'Status'];

    const actions = [
        {
            label: 'Edit',
            className: 'btn-edit',
            onClick: (row) => {
                setEditingMerchant(row);
                setShowForm(true);
            },
        },
        {
            label: 'Delete',
            className: 'btn-delete',
            onClick: async (row) => {
                if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
                    await deleteMerchant(row.id);
                    fetchMerchants();
                }
            },
        },
    ];

    const formFields = [
        { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your name', required: true },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com', required: true },
        { label: 'Contact Number', name: 'contact_number', type: 'number', placeholder: 'Enter contact number', required: true },
        { label: 'Address', name: 'address', type: 'textarea', placeholder: 'Write Address...', required: false },
        {
            label: 'Status',
            name: 'status',
            type: 'radio',
            options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
            ],
            required: true
        },
    ];

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

            <DataTable columns={columns} data={merchants} actions={actions} />

            {showForm && (
                <ModalForm
                    title={editingMerchant ? 'Edit Merchant' : 'Add New Merchant'}
                    onClose={() => {
                        setShowForm(false);
                        setEditingMerchant(null);
                    }}
                    onSubmit={handleSubmit}
                    fields={formFields}
                    initialValues={editingMerchant || {}}
                />
            )}
        </div>
    );
};

export default Merchant;
