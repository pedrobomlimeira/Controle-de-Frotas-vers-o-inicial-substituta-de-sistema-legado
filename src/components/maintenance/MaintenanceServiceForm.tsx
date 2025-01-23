import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { maintenanceApi } from "@/lib/api/maintenance";
import { MaintenanceService, MaintenanceGroup } from "@/types/maintenance";

interface MaintenanceServiceFormProps {
  service?: MaintenanceService | null;
  groups: MaintenanceGroup[];
  onClose: () => void;
  onSubmit: () => void;
}

const MaintenanceServiceForm = ({ service, groups, onClose, onSubmit }: MaintenanceServiceFormProps) => {
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [frequency, setFrequency] = useState("");
  const [firstReview, setFirstReview] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (service) {
      setDescription(service.description);
      setGroupId(service.group_id.toString());
      setFrequency(service.frequency);
      setFirstReview(service.first_review);
      setNotes(service.notes || "");
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      description,
      group_id: parseInt(groupId),
      frequency,
      first_review: firstReview,
      notes: notes || null,
    } as Omit<MaintenanceService, "id" | "created_at" | "updated_at">;

    try {
      if (service) {
        await maintenanceApi.updateService(service.id, serviceData);
      } else {
        await maintenanceApi.createService(serviceData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {service ? "Edit Maintenance Service" : "Add Maintenance Service"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="group">Maintenance Group</Label>
            <Select value={groupId} onValueChange={setGroupId}>
              <SelectTrigger>
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="frequency">Frequency (ISO 8601 format)</Label>
            <Input
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="firstReview">First Review (ISO 8601 format)</Label>
            <Input
              id="firstReview"
              value={firstReview}
              onChange={(e) => setFirstReview(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceServiceForm;
