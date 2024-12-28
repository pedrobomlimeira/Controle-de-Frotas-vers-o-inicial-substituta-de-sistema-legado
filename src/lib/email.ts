import { VehicleRequest } from "@/types/vehicle-request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const emailService = {
  // Send notification to requester
  sendRequesterNotification: async (request: VehicleRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/notifications/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: request.requesterEmail,
        template: "vehicle-request-status",
        data: {
          requesterName: request.requesterName,
          status: request.status,
          startDate: request.startDate,
          endDate: request.endDate,
          vehicleType: request.vehicleType,
          destination: request.destination,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email notification");
    }

    return response.json();
  },

  // Send notification to approvers
  sendApproverNotification: async (
    request: VehicleRequest,
    approverEmails: string[],
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/notifications/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: approverEmails,
        template: "vehicle-request-approval",
        data: {
          requesterName: request.requesterName,
          startDate: request.startDate,
          endDate: request.endDate,
          vehicleType: request.vehicleType,
          destination: request.destination,
          purpose: request.purpose,
          requestId: request.id,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send approval notification");
    }

    return response.json();
  },
};
