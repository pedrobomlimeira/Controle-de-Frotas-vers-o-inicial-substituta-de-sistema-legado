import React from "react";
import FileUpload from "@/components/ui/file-upload";
import { FileAttachment } from "@/types/file-attachment";
import { fileUploadApi } from "@/lib/api/file-upload";
import { useToast } from "@/components/ui/use-toast";

interface AttachmentsFieldProps {
  entityType: FileAttachment["entityType"];
  entityId?: string;
  value?: FileAttachment[];
  onChange?: (attachments: FileAttachment[]) => void;
  maxFiles?: number;
  maxSize?: number;
}

const AttachmentsField = ({
  entityType,
  entityId,
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5,
}: AttachmentsFieldProps) => {
  const { toast } = useToast();
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFilesChange = async (newFiles: File[]) => {
    setFiles(newFiles);
    if (!entityId) return;

    setIsUploading(true);
    try {
      const uploadPromises = newFiles.map((file) => fileUploadApi.upload(file));
      const uploadedFiles = await Promise.all(uploadPromises);

      const newAttachments: FileAttachment[] = uploadedFiles.map((upload) => ({
        id: upload.id,
        fileName: upload.fileName,
        fileType: upload.fileType,
        fileSize: upload.fileSize,
        url: upload.url,
        uploadedAt: new Date().toISOString(),
        entityType,
        entityId,
      }));

      onChange?.([...value, ...newAttachments]);

      toast({
        title: "Files uploaded",
        description: `Successfully uploaded ${newFiles.length} files`,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (index: number) => {
    if (!entityId) return;

    try {
      const attachment = value[index];
      await fileUploadApi.delete(attachment.id);

      const newAttachments = [...value];
      newAttachments.splice(index, 1);
      onChange?.(newAttachments);

      toast({
        title: "File removed",
        description: `Successfully removed ${attachment.fileName}`,
      });
    } catch (error) {
      console.error("Error removing file:", error);
      toast({
        title: "Remove failed",
        description: "There was an error removing the file",
        variant: "destructive",
      });
    }
  };

  return (
    <FileUpload
      label="Attachments"
      accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
      maxFiles={maxFiles}
      maxSize={maxSize}
      value={files}
      onChange={handleFilesChange}
      onRemove={handleRemove}
    />
  );
};

export default AttachmentsField;
