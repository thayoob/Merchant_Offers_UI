import React, { useState, useEffect } from 'react';
import "../../assets/style/formModel.css";

const ModalForm = ({
    title,
    onClose,
    onSubmit,
    fields,
    initialValues = {},
    apiErrors,
    externalFormData,
    onExternalChange
}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const defaults = {};
        fields.forEach(field => {
            if (field.type === 'date' && initialValues[field.name]) {
                const dateValue = new Date(initialValues[field.name]);
                defaults[field.name] = dateValue.toISOString().split('T')[0];
            } else {
                defaults[field.name] = initialValues[field.name] || '';
            }
        });
        setFormData(defaults);
    }, [initialValues, fields]);

    useEffect(() => {
        if (apiErrors) {
            setErrors(apiErrors);
        }
    }, [apiErrors]);

    useEffect(() => {
        if (externalFormData) {
            setFormData(externalFormData);
        }
    }, [externalFormData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        };

        setFormData(newFormData);
        if (onExternalChange) {
            onExternalChange(newFormData);
        }

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, formData);
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const renderFieldError = (fieldName) => {
        if (!errors[fieldName]) return null;

        return (
            <div className="field-error">
                {Array.isArray(errors[fieldName])
                    ? errors[fieldName].join(' ')
                    : errors[fieldName]}
            </div>
        );
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                {errors.general && (
                    <div className="form-error-message">
                        {errors.general}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {fields.map((field, idx) => {
                            let value = formData[field.name] || '';

                            if (field.type === 'date' && value) {
                                value = formatDateForInput(value);
                            }

                            return (
                                <div
                                    className={`form-group ${field.fullWidth ? 'full-width' : ''} ${errors[field.name] ? 'has-error' : ''}`}
                                    key={idx}
                                    style={field.style}
                                >
                                    <label htmlFor={field.name}>
                                        {field.label}{field.required ? '*' : ''}
                                    </label>

                                    {field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            required={field.required ?? true}
                                            value={value}
                                            onChange={handleChange}
                                            className={errors[field.name] ? 'error' : ''}
                                        >
                                            <option value="" disabled>Select {field.label}</option>
                                            {field.options?.map((option, i) => (
                                                <option key={i} value={option.value || option}>
                                                    {option.label || option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            placeholder={field.placeholder || `Enter ${field.label}`}
                                            required={field.required ?? true}
                                            rows={field.rows || 4}
                                            value={value}
                                            onChange={handleChange}
                                            className={errors[field.name] ? 'error' : ''}
                                        />
                                    ) : field.type === 'radio' ? (
                                        <div className="radio-group">
                                            {field.options?.map((option, i) => (
                                                <label key={i} className="radio-label">
                                                    <input
                                                        type="radio"
                                                        name={field.name}
                                                        value={option.value || option}
                                                        checked={value === (option.value || option)}
                                                        required={field.required ?? true}
                                                        onChange={handleChange}
                                                    />
                                                    {option.label || option}
                                                </label>
                                            ))}
                                        </div>
                                    ) : field.type === 'checkbox' ? (
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                id={field.name}
                                                name={field.name}
                                                checked={!!value}
                                                onChange={handleChange}
                                            />
                                            {field.placeholder || field.label}
                                        </label>
                                    ) : field.type === 'date' ? (
                                        <input
                                            type="date"
                                            id={field.name}
                                            name={field.name}
                                            required={field.required ?? true}
                                            value={value}
                                            onChange={handleChange}
                                            min={field.min}
                                            max={field.max}
                                            className={errors[field.name] ? 'error' : ''}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            placeholder={field.placeholder || `Enter ${field.label}`}
                                            step={field.step}
                                            required={field.required ?? true}
                                            value={value}
                                            min={field.min}
                                            max={field.max}
                                            onChange={handleChange}
                                            className={errors[field.name] ? 'error' : ''}
                                        />
                                    )}

                                    {renderFieldError(field.name)}
                                    {field.helpText && <small className="help-text">{field.helpText}</small>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;