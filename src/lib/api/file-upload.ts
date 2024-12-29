import { FileUploadResponse } from "@/types/file-attachment";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fileUploadApi = {
  // Mock implementation - replace with actual API calls
  upload: async (file: File): Promise<FileUploadResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response
    return {
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    };
  },

  // Mock delete implementation
  delete: async (fileId: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real implementation, this would call your backend API
  },
};
