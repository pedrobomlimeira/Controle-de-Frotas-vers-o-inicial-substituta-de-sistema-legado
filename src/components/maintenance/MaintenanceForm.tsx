import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AttachmentsField from "@/components/forms/AttachmentsField";
import { FileAttachment } from "@/types/file-attachment";

interface MaintenanceFormData {
  id?: string;
  vehicleId: string;
  serviceType: string;
  description: string;
  scheduledDate: string;
  completionDate?: string;
  cost: number;
  status: "scheduled" | "in-progress" | "completed";
  serviceProvider: string;
  notes?: string;
  attachments: FileAttachment[];
}

interface MaintenanceFormProps {
  initialData?: Partial<MaintenanceFormData>;
  onSubmit: (data: MaintenanceFormData) => void;
  vehicles: Array<{ id: string; plate: string }>;
}

const MaintenanceForm = ({
  initialData = {},
  onSubmit,
  vehicles,
}: MaintenanceFormProps) => {
  const [formData, setFormData] = React.useState<MaintenanceFormData>({
    vehicleId: "",
    serviceType: "",
    description: "",
    scheduledDate: "",
    cost: 0,
    status: "scheduled",
    serviceProvider: "",
    notes: "",
    attachments: [],
    ...initialData,
  });

  const handleChange = (field: keyof MaintenanceFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>
          {initialData.id ? "Edit Maintenance" : "Schedule Maintenance"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehicle</Label>
              <Select
                value={formData.vehicleId}
                onValueChange={(value) => handleChange("vehicleId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.plate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleChange("serviceType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oil-change">Oil Change</SelectItem>
                  <SelectItem value="tire-service">Tire Service</SelectItem>
                  <SelectItem value="brake-service">Brake Service</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleChange("scheduledDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                value={formData.completionDate}
                onChange={(e) => handleChange("completionDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={(e) =>
                  handleChange("cost", parseFloat(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: MaintenanceFormData["status"]) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceProvider">Service Provider</Label>
              <Input
                id="serviceProvider"
                value={formData.serviceProvider}
                onChange={(e) =>
                  handleChange("serviceProvider", e.target.value)
                }
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <AttachmentsField
                entityType="maintenance"
                entityId={formData.id}
                value={formData.attachments}
                onChange={(attachments) =>
                  handleChange("attachments", attachments)
                }
                maxFiles={10}
                maxSize={10}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              {initialData.id ? "Update" : "Schedule"} Maintenance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceForm;
