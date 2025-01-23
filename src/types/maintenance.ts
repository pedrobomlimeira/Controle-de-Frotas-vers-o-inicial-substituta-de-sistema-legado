export interface Maintenance {
  id: number;
  vehicle_id: number;
  service_id: number;
  date: string;
  cost: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceGroup {
  id: number;
  description: string;
  lifespan: string; // ISO 8601 duration format
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceService {
  id: number;
  description: string;
  group_id: number;
  frequency: string; // ISO 8601 duration format
  first_review: string; // ISO 8601 duration format
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleType {
  id: number;
  description: string;
  load_capacity: number;
  cargo_type: string;
  maintenance_type: 'km' | 'time' | 'consumption';
  created_at: string;
  updated_at: string;
}
