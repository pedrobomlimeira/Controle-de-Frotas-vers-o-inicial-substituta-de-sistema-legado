// src/types/Company.ts
export class Company {
    id: string;
    name: string;
    address?: string;
    contactNumber?: string;

    constructor(id: string, name: string, address?: string, contactNumber?: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
    }
}
