import React from "react";
import DataFilter from "@/components/ui/data-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Wrench, AlertTriangle } from "lucide-react";

interface MaintenanceItem {
  id: string;
  vehicleId: string;
  vehicleName: string;
  serviceType: string;
  scheduledDate: string;
  priority: "low" | "medium" | "high";
  status: "scheduled" | "in-progress" | "completed";
}

interface MaintenanceScheduleProps {
  maintenanceItems?: MaintenanceItem[];
}

const defaultMaintenanceItems: MaintenanceItem[] = [
  {
    id: "1",
    vehicleId: "VEH001",
    vehicleName: "Toyota Camry",
    serviceType: "Oil Change",
    scheduledDate: "2024-02-15",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "2",
    vehicleId: "VEH002",
    vehicleName: "Ford F-150",
    serviceType: "Tire Rotation",
    scheduledDate: "2024-02-16",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "3",
    vehicleId: "VEH003",
    vehicleName: "Honda Civic",
    serviceType: "Brake Inspection",
    scheduledDate: "2024-02-17",
    priority: "low",
    status: "scheduled",
  },
];

const maintenanceFilters = [
  {
    name: "Priority",
    options: [
      { value: "all", label: "All Priorities" },
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
  },
  {
    name: "Status",
    options: [
      { value: "all", label: "All Status" },
      { value: "scheduled", label: "Scheduled" },
      { value: "in-progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
    ],
  },
  {
    name: "Service Type",
    options: [
      { value: "all", label: "All Services" },
      { value: "oil", label: "Oil Change" },
      { value: "tires", label: "Tire Service" },
      { value: "brakes", label: "Brake Service" },
      { value: "inspection", label: "Inspection" },
    ],
  },
];

const getPriorityColor = (priority: MaintenanceItem["priority"]) => {
  switch (priority) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const getStatusBadgeVariant = (status: MaintenanceItem["status"]) => {
  switch (status) {
    case "scheduled":
      return "secondary";
    case "in-progress":
      return "default";
    case "completed":
      return "outline";
    default:
      return "secondary";
  }
};

const MaintenanceSchedule = ({
  maintenanceItems = defaultMaintenanceItems,
}: MaintenanceScheduleProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-xl font-bold">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Schedule
            </div>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {maintenanceItems.length} scheduled items
          </div>
        </div>
        <DataFilter
          searchPlaceholder="Search maintenance..."
          filters={maintenanceFilters}
          onSearchChange={(value) => console.log("Search:", value)}
          onFilterChange={(filter, value) =>
            console.log("Filter:", filter, value)
          }
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.vehicleName}
                </TableCell>
                <TableCell>{item.serviceType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    {item.scheduledDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`h-4 w-4 ${getPriorityColor(item.priority)}`}
                    />
                    <span className="capitalize">{item.priority}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedule;
