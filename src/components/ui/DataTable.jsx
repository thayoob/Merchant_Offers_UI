import React from 'react';
import '../../assets/style/Table.css';

const DataTable = ({ columns, data, actions }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx}>{col}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {row[col.toLowerCase().replace(/ /g, '_')]}
                            </td>
                        ))}
                        <td>
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
                    </tr>
                ))}
            </tbody>

        </table>
    );
};

export default DataTable;
