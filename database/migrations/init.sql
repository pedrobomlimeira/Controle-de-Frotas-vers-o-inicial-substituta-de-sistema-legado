-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicles table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    plate VARCHAR(20) UNIQUE NOT NULL,
    model VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    vin VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create drivers table
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    license_number VARCHAR(100) NOT NULL,
    license_expiry DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance table
CREATE TABLE maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id),
    service_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    completion_date DATE,
    cost DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    service_provider VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicle_requests table
CREATE TABLE vehicle_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    requester_id UUID REFERENCES users(id),
    vehicle_type VARCHAR(50) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    destination VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    number_of_passengers INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trips table
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    vehicle_id UUID REFERENCES vehicles(id),
    driver_id UUID REFERENCES drivers(id),
    request_id UUID REFERENCES vehicle_requests(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    start_location VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'planned',
    start_odometer INTEGER,
    end_odometer INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicle_types table
CREATE TABLE vehicle_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create driver_statuses table
CREATE TABLE driver_statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create service_types table
CREATE TABLE service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create vehicle_request_types table
CREATE TABLE vehicle_request_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Alter vehicles table to reference vehicle_types
ALTER TABLE vehicles ADD COLUMN type_id UUID REFERENCES vehicle_types(id);

-- Alter drivers table to reference driver_statuses
ALTER TABLE drivers ADD COLUMN status_id UUID REFERENCES driver_statuses(id);

-- Alter maintenance table to reference service_types
ALTER TABLE maintenance ADD COLUMN service_type_id UUID REFERENCES service_types(id);

-- Alter vehicle_requests table to reference vehicle_request_types
ALTER TABLE vehicle_requests ADD COLUMN request_type_id UUID REFERENCES vehicle_request_types(id);
{{ ... }}