// src/types/User.ts
export interface User {
    id: string; // Unique identifier for the user
    name: string; // User's full name
    email: string; // User's email address
    address?: string; // User's address
    contactNumber?: string; // User's contact number
    profilePicture?: string; // URL to the user's profile picture
    description?: string; // A brief description or bio of the user
    responsibilities?: string[]; // List of responsibilities assigned to the user
    createdAt: Date; // Date when the user was created
    updatedAt: Date; // Date when the user information was last updated
}
