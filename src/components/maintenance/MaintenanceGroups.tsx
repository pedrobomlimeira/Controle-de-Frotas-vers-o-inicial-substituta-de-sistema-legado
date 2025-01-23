import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { maintenanceApi } from "@/lib/api/maintenance";
import { MaintenanceGroup } from "@/types/maintenance";
import MaintenanceGroupForm from "./MaintenanceGroupForm";

const MaintenanceGroups = () => {
  const [groups, setGroups] = useState<MaintenanceGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<MaintenanceGroup | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await maintenanceApi.getGroups();
      setGroups(data);
    } catch (error) {
      console.error("Error loading groups:", error);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedGroup(null);
    await loadGroups();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Groups</h1>
        <Button onClick={() => setShowForm(true)}>Add Group</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Lifespan</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.description}</TableCell>
              <TableCell>{group.lifespan}</TableCell>
              <TableCell>{group.notes}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showForm && (
        <MaintenanceGroupForm
          group={selectedGroup}
          onClose={() => {
            setShowForm(false);
            setSelectedGroup(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default MaintenanceGroups;
