export interface VehicleRequest {
  id: string;
  companyId: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  vehicleType: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  purpose: string;
  numberOfPassengers: number;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
}

export interface CreateVehicleRequestDTO {
  companyId: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  vehicleType: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  purpose: string;
  numberOfPassengers: number;
  notes?: string;
}

export interface UpdateVehicleRequestStatusDTO {
  status: "approved" | "rejected";
  approvedBy: string;
}
