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
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{row[col.toLowerCase()]}</td>
                        ))}
                        {actions && (
                            <td>
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        className={action.className}
                                        onClick={() => action.onClick(row)}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
