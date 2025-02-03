// src/components/users/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import { User } from '@/types/User'; // Import the User type

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        address: '',
        contactNumber: '',
        profilePicture: '',
        description: '',
        responsibilities: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users'); // Adjust the API endpoint as necessary
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const userToAdd = { ...newUser, id: generateUniqueId(), createdAt: new Date(), updatedAt: new Date() }; // Ensure id and timestamps are set

        // Implement the logic to add a new user to the backend
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToAdd),
            });

            if (response.ok) {
                setUsers([...users, userToAdd]); // Update local state
                setNewUser({ id: '', name: '', email: '', address: '', contactNumber: '', profilePicture: '', description: '', responsibilities: [], createdAt: new Date(), updatedAt: new Date() }); // Reset form
            } else {
                console.error('Error adding user:', await response.text());
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleAddUser}>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Name" required />
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" required />
                <input type="text" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} placeholder="Address" />
                <input type="text" value={newUser.contactNumber} onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })} placeholder="Contact Number" />
                <input type="text" value={newUser.profilePicture} onChange={(e) => setNewUser({ ...newUser, profilePicture: e.target.value })} placeholder="Profile Picture URL" />
                <textarea value={newUser.description} onChange={(e) => setNewUser({ ...newUser, description: e.target.value })} placeholder="Description"></textarea>
                <button type="submit">Add User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
