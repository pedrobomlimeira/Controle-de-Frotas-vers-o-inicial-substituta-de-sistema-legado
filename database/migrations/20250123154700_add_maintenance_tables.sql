-- Create Maintenance Groups table
CREATE TABLE maintenance_groups (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    lifespan INTERVAL NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Maintenance Services table
CREATE TABLE maintenance_services (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    group_id INTEGER REFERENCES maintenance_groups(id) ON DELETE CASCADE,
    frequency INTERVAL NOT NULL,
    first_review INTERVAL NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Vehicle Types table
CREATE TABLE vehicle_types (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    load_capacity NUMERIC NOT NULL,
    cargo_type TEXT NOT NULL,
    maintenance_type TEXT NOT NULL CHECK (maintenance_type IN ('km', 'time', 'consumption')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add vehicle type reference to vehicles table
ALTER TABLE vehicles ADD COLUMN vehicle_type_id INTEGER REFERENCES vehicle_types(id);
