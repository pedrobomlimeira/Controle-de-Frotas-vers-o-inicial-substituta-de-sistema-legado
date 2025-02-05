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
import { MaintenanceService, MaintenanceGroup } from "@/types/maintenance";
import MaintenanceServiceForm from "./MaintenanceServiceForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const MaintenanceServices = () => {
  const [services, setServices] = useState<MaintenanceService[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState<MaintenanceService | null>(null);
  const [groups, setGroups] = useState<MaintenanceGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  useEffect(() => {
    loadServices();
    loadGroups();
  }, []);

  const loadServices = async (groupId?: number | null) => {
    try {
      const data = await maintenanceApi.getServicesByGroup(groupId);
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

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
    setSelectedService(null);
    await loadServices();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Services</h1>
        <div className="flex items-center gap-4">
          <Select 
            value={selectedGroupId?.toString() || ""}
            onValueChange={(value) => {
              setSelectedGroupId(value ? parseInt(value) : null);
              loadServices(value ? parseInt(value) : null);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Groups</SelectItem>
              {groups.map(group => (
                <SelectItem key={group.id} value={group.id.toString()}>
                  {group.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>Add Service</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>First Review</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => {
            const group = groups.find(g => g.id === service.group_id);
            return (
              <TableRow key={service.id}>
                <TableCell>{service.description}</TableCell>
                <TableCell>{group?.description}</TableCell>
                <TableCell>{service.frequency}</TableCell>
                <TableCell>{service.first_review}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedService(service);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {showForm && (
        <MaintenanceServiceForm
          service={selectedService}
          groups={groups}
          onClose={() => {
            setShowForm(false);
            setSelectedService(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default MaintenanceServices;
