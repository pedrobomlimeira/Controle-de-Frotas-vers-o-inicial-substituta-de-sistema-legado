// src/components/layout/CompanySelector.tsx
import React, { useEffect, useState } from 'react';
import { Company } from '@/types/Company'; // Import the Company type
import { useTable } from 'react-table'; // Import from React Table

const CompanySelector = () => {
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch('/api/companies'); // Adjust the API endpoint as necessary
            const data = await response.json();
            setCompanies(data.map(company => ({
                id: company.id,
                name: company.name,
                status: company.status,
                createdAt: company.created_at,
            })));
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Created At', accessor: 'createdAt' },
    ];

    const tableInstance = useTable({ columns, data: companies });

    return (
        <div>
            <h1>Company Selector</h1>
            <table {...tableInstance.getTableProps()}>
                <thead>
                    {tableInstance.headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...tableInstance.getTableBodyProps()}>
                    {tableInstance.rows.map(row => {
                        tableInstance.prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CompanySelector;