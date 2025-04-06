import React from 'react';

const ModalForm = ({ title, onClose, onSubmit, fields }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={onSubmit}>
                    {fields.map((field, idx) => (
                        <div className="form-group" key={idx}>
                            <label>{field.label}</label>
                            {field.type === 'select' ? (
                                <select name={field.name} required>
                                    <option value="">Select {field.label}</option>
                                    {field.options.map((option, i) => (
                                        <option value={option} key={i}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    step={field.step}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
