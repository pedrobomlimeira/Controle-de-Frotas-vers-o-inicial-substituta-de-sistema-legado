import {
  CreateVehicleRequestDTO,
  UpdateVehicleRequestStatusDTO,
  VehicleRequest,
} from "@/types/vehicle-request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const vehicleRequestsApi = {
  // Create a new vehicle request
  create: async (data: CreateVehicleRequestDTO): Promise<VehicleRequest> => {
    const response = await fetch(`${API_BASE_URL}/api/vehicle-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create vehicle request");
    }

    return response.json();
  },

  // Get all vehicle requests for a company
  getByCompany: async (companyId: string): Promise<VehicleRequest[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/vehicle-requests?companyId=${companyId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle requests");
    }

    return response.json();
  },

  // Update request status (approve/reject)
  updateStatus: async (
    requestId: string,
    data: UpdateVehicleRequestStatusDTO,
  ): Promise<VehicleRequest> => {
    const response = await fetch(
      `${API_BASE_URL}/api/vehicle-requests/${requestId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update vehicle request status");
    }

    return response.json();
  },

  // Check vehicle availability for a given time period
  checkAvailability: async (params: {
    companyId: string;
    vehicleType: string;
    startDate: Date;
    endDate: Date;
  }): Promise<{ available: boolean; conflicts?: VehicleRequest[] }> => {
    const response = await fetch(
      `${API_BASE_URL}/api/vehicle-requests/check-availability?` +
        new URLSearchParams({
          companyId: params.companyId,
          vehicleType: params.vehicleType,
          startDate: params.startDate.toISOString(),
          endDate: params.endDate.toISOString(),
        }),
    );

    if (!response.ok) {
      throw new Error("Failed to check vehicle availability");
    }

    return response.json();
  },
};
