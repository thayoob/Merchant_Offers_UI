import React, { useState } from 'react';
import DataTable from '../components/ui/DataTable';
import ModalForm from '../components/ui/ModalForm';

const Products = () => {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', category: 'Electronics', price: 299.99, stock: 45 },
        { id: 2, name: 'Product 2', category: 'Clothing', price: 49.99, stock: 120 },
        { id: 3, name: 'Product 3', category: 'Home', price: 199.99, stock: 30 },
    ]);

    const columns = ['ID', 'Name', 'Category', 'Price', 'Stock'];

    const actions = [
        { label: 'Edit', className: 'btn-edit', onClick: (row) => console.log('Edit', row) },
        { label: 'Delete', className: 'btn-delete', onClick: (row) => console.log('Delete', row) },
    ];

    const formFields = [
        { label: 'Product Name', name: 'name', type: 'text' },
        { label: 'Category', name: 'category', type: 'select', options: ['Electronics', 'Clothing', 'Home'] },
        { label: 'Price', name: 'price', type: 'number', step: '0.01' },
        { label: 'Stock Quantity', name: 'stock', type: 'number' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the form
        setShowForm(false);
    };

    return (
        <div>
            <header className="content-header">
                <h1>Products</h1>
                <button className="btn-primary" onClick={() => setShowForm(true)}>Add Product</button>
            </header>

            <DataTable columns={columns} data={products} actions={actions} />

            {showForm && (
                <ModalForm
                    title="Add New Product"
                    onClose={() => setShowForm(false)}
                    onSubmit={handleSubmit}
                    fields={formFields}
                />
            )}
        </div>
    );
};

export default Products;
