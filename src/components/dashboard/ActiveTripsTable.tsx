import React from "react";
import DataFilter from "@/components/ui/data-filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QrCode, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Trip {
  id: string;
  vehiclePlate: string;
  vehicleModel: string;
  vehicleQrCode: string;
  driverName: string;
  driverAvatar: string;
  driverQrCode: string;
  startTime: string;
  destination: string;
  status: "in-progress" | "returning";
  startOdometer: number;
  currentOdometer?: number;
  notes?: string;
}

interface ActiveTripsTableProps {
  trips?: Trip[];
}

const defaultTrips: Trip[] = [
  {
    id: "1",
    vehiclePlate: "ABC-1234",
    vehicleModel: "Toyota Corolla",
    vehicleQrCode: "V-ABC1234",
    driverName: "John Doe",
    driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    driverQrCode: "D-JD001",
    startTime: "09:30 AM",
    destination: "Downtown Office",
    status: "in-progress",
    startOdometer: 45678,
    currentOdometer: 45723,
    notes: "Traffic on main route, taking alternate path",
  },
  {
    id: "2",
    vehiclePlate: "XYZ-5678",
    vehicleModel: "Honda Civic",
    vehicleQrCode: "V-XYZ5678",
    driverName: "Jane Smith",
    driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    driverQrCode: "D-JS002",
    startTime: "10:15 AM",
    destination: "Airport",
    status: "returning",
    startOdometer: 32100,
    currentOdometer: 32165,
    notes: "Pickup completed, returning to base",
  },
  {
    id: "3",
    vehiclePlate: "DEF-9012",
    vehicleModel: "Ford Transit",
    vehicleQrCode: "V-DEF9012",
    driverName: "Mike Johnson",
    driverAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    driverQrCode: "D-MJ003",
    startTime: "11:00 AM",
    destination: "Warehouse District",
    status: "in-progress",
    startOdometer: 78900,
    currentOdometer: 78925,
  },
];

const tripFilters = [
  {
    name: "Status",
    options: [
      { value: "all", label: "All Status" },
      { value: "in-progress", label: "In Progress" },
      { value: "returning", label: "Returning" },
    ],
  },
  {
    name: "Vehicle Type",
    options: [
      { value: "all", label: "All Vehicles" },
      { value: "car", label: "Cars" },
      { value: "van", label: "Vans" },
      { value: "truck", label: "Trucks" },
    ],
  },
];

const ActiveTripsTable = ({ trips = defaultTrips }: ActiveTripsTableProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Active Trips</CardTitle>
          <div className="text-sm text-muted-foreground">
            {trips.length} active trips
          </div>
        </div>
        <DataFilter
          searchPlaceholder="Search trips..."
          filters={tripFilters}
          onSearchChange={(value) => {
            console.log("Search:", value);
          }}
          onFilterChange={(filter, value) => {
            console.log("Filter:", filter, value);
          }}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Odometer</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{trip.vehiclePlate}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QrCode className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vehicle QR: {trip.vehicleQrCode}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-sm text-gray-500">
                      {trip.vehicleModel}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={trip.driverAvatar}
                        alt={trip.driverName}
                      />
                      <AvatarFallback>
                        {trip.driverName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span>{trip.driverName}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <QrCode className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Driver QR: {trip.driverQrCode}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{trip.startTime}</TableCell>
                <TableCell>{trip.destination}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">
                      Start: {trip.startOdometer.toLocaleString()} km
                    </div>
                    {trip.currentOdometer && (
                      <div className="text-sm text-muted-foreground">
                        Current: {trip.currentOdometer.toLocaleString()} km
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {trip.notes ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{trip.notes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trip.status === "in-progress" ? "default" : "secondary"
                    }
                  >
                    {trip.status === "in-progress"
                      ? "In Progress"
                      : "Returning"}
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

export default ActiveTripsTable;
