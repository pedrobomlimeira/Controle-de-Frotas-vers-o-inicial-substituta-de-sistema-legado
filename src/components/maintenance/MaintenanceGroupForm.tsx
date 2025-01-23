import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { maintenanceApi } from "@/lib/api/maintenance";
import { MaintenanceGroup } from "@/types/maintenance";

interface MaintenanceGroupFormProps {
  group?: MaintenanceGroup | null;
  onClose: () => void;
  onSubmit: () => void;
}

const MaintenanceGroupForm = ({ group, onClose, onSubmit }: MaintenanceGroupFormProps) => {
  const [description, setDescription] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (group) {
      setDescription(group.description);
      setLifespan(group.lifespan);
      setNotes(group.notes || "");
    }
  }, [group]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const groupData = {
      description,
      lifespan,
      notes: notes || null,
    } as Omit<MaintenanceGroup, "id" | "created_at" | "updated_at">;

    try {
      if (group) {
        await maintenanceApi.updateGroup(group.id, groupData);
      } else {
        await maintenanceApi.createGroup(groupData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving group:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {group ? "Edit Maintenance Group" : "Add Maintenance Group"}
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
            <Label htmlFor="lifespan">Lifespan (ISO 8601 format)</Label>
            <Input
              id="lifespan"
              value={lifespan}
              onChange={(e) => setLifespan(e.target.value)}
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

export default MaintenanceGroupForm;
