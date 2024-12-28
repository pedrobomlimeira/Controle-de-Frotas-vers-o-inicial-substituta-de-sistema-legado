import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench, Route } from "lucide-react";

interface FleetStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const FleetStatusCard = ({
  title = "Status",
  count = 0,
  icon = <Car />,
  description = "No description",
  color = "text-gray-500",
}: FleetStatusCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`${color} h-4 w-4`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface FleetStatusGridProps {
  stats?: {
    available: number;
    maintenance: number;
    inUse: number;
  };
}

const FleetStatusGrid = ({
  stats = {
    available: 12,
    maintenance: 3,
    inUse: 8,
  },
}: FleetStatusGridProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fleet Status Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <FleetStatusCard
          title="Available Vehicles"
          count={stats.available}
          icon={<Car />}
          description="Vehicles ready for use"
          color="text-green-500"
        />
        <FleetStatusCard
          title="In Maintenance"
          count={stats.maintenance}
          icon={<Wrench />}
          description="Vehicles under maintenance"
          color="text-yellow-500"
        />
        <FleetStatusCard
          title="In Use"
          count={stats.inUse}
          icon={<Route />}
          description="Currently on trips"
          color="text-blue-500"
        />
      </div>
    </div>
  );
};

export default FleetStatusGrid;
