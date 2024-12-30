-- Insert demo company
INSERT INTO companies (id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Transport Co. Ltd');

-- Insert demo users
INSERT INTO users (company_id, email, name, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@fleet.com', 'Admin User', 'admin'),
('550e8400-e29b-41d4-a716-446655440000', 'manager@fleet.com', 'Manager User', 'manager');

-- Insert demo vehicles
INSERT INTO vehicles (company_id, plate, model, type, year, vin) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'ABC-1234', 'Toyota Corolla', 'car', 2022, 'JT2BF22K1W0123456'),
('550e8400-e29b-41d4-a716-446655440000', 'XYZ-5678', 'Ford Transit', 'van', 2021, '1FTBW2CM7MKA12345');

-- Insert demo drivers
INSERT INTO drivers (company_id, name, email, phone, license_number, license_expiry) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'john@fleet.com', '555-0123', 'DL123456', '2024-12-31'),
('550e8400-e29b-41d4-a716-446655440000', 'Jane Smith', 'jane@fleet.com', '555-0124', 'DL789012', '2024-12-31');
