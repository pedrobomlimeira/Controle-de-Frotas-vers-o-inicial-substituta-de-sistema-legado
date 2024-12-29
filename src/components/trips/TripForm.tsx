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

interface TripFormData {
  id?: string;
  vehicleId: string;
  driverId: string;
  startDate: string;
  endDate: string;
  startLocation: string;
  destination: string;
  purpose: string;
  status: "planned" | "in-progress" | "completed" | "cancelled";
  startOdometer?: number;
  endOdometer?: number;
  notes?: string;
  attachments: FileAttachment[];
}

interface TripFormProps {
  initialData?: Partial<TripFormData>;
  onSubmit: (data: TripFormData) => void;
  vehicles: Array<{ id: string; plate: string }>;
  drivers: Array<{ id: string; name: string }>;
}

const TripForm = ({
  initialData = {},
  onSubmit,
  vehicles,
  drivers,
}: TripFormProps) => {
  const [formData, setFormData] = React.useState<TripFormData>({
    vehicleId: "",
    driverId: "",
    startDate: "",
    endDate: "",
    startLocation: "",
    destination: "",
    purpose: "",
    status: "planned",
    notes: "",
    attachments: [],
    ...initialData,
  });

  const handleChange = (field: keyof TripFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>{initialData.id ? "Edit Trip" : "Plan Trip"}</CardTitle>
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
              <Label htmlFor="driverId">Driver</Label>
              <Select
                value={formData.driverId}
                onValueChange={(value) => handleChange("driverId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startLocation">Start Location</Label>
              <Input
                id="startLocation"
                value={formData.startLocation}
                onChange={(e) => handleChange("startLocation", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                required
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleChange("purpose", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TripFormData["status"]) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.status === "in-progress" ||
              formData.status === "completed") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="startOdometer">Start Odometer</Label>
                  <Input
                    id="startOdometer"
                    type="number"
                    min="0"
                    value={formData.startOdometer}
                    onChange={(e) =>
                      handleChange("startOdometer", parseInt(e.target.value))
                    }
                  />
                </div>

                {formData.status === "completed" && (
                  <div className="space-y-2">
                    <Label htmlFor="endOdometer">End Odometer</Label>
                    <Input
                      id="endOdometer"
                      type="number"
                      min={formData.startOdometer}
                      value={formData.endOdometer}
                      onChange={(e) =>
                        handleChange("endOdometer", parseInt(e.target.value))
                      }
                    />
                  </div>
                )}
              </>
            )}

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
                entityType="trip"
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
              {initialData.id ? "Update" : "Create"} Trip
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TripForm;
