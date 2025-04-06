import React from 'react';
import '../../assets/style/Table.css';

const DataTable = ({ columns, data, actions }) => {
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((o, p) => (o || {})[p], obj);
    };

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx}>{col.label}</th>
                        ))}
                        {actions && actions.length > 0 && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.key.includes('.')
                                            ? getNestedValue(row, col.key)
                                            : row[col.key]}
                                    </td>
                                ))}
                                {actions && actions.length > 0 && (
                                    <td className="actions-cell">
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                className={`btn ${action.className}`}
                                                onClick={() => action.onClick(row)}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="no-data">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;