export interface FileAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
  entityType: "vehicle" | "driver" | "trip" | "maintenance";
  entityId: string;
}

export interface FileUploadResponse {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
