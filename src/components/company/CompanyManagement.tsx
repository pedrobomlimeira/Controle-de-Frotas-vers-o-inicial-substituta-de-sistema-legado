// src/components/company/CompanyManagement.tsx
import React, { useState, useEffect } from 'react';
import { Company } from '@/types/Company';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [newCompany, setNewCompany] = useState<Company>({ id: '', name: '', address: '', contactNumber: '' });

    useEffect(() => {
        // Fetch companies from the backend or state management
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        // Implement the logic to fetch companies
    };

    const handleAddCompany = async () => {
        // Implement the logic to add a new company
        setCompanies([...companies, newCompany]);
        setNewCompany({ id: '', name: '', address: '', contactNumber: '' }); // Reset form
    };

    return (
        <div>
            <h1>Company Management</h1>
            <form onSubmit={handleAddCompany}>
                <input type="text" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} placeholder="Company Name" required />
                <input type="text" value={newCompany.address} onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })} placeholder="Address" />
                <input type="text" value={newCompany.contactNumber} onChange={(e) => setNewCompany({ ...newCompany, contactNumber: e.target.value })} placeholder="Contact Number" />
                <button type="submit">Add Company</button>
            </form>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>{company.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyManagement;
