import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { VehicleRequest } from "@/types/vehicle-request";
import { format, parseISO } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface VehicleRequestCalendarProps {
  requests?: VehicleRequest[];
  onDateSelect?: (date: Date) => void;
}

const getStatusColor = (status: VehicleRequest["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
};

const VehicleRequestCalendar = ({
  requests = [],
  onDateSelect,
}: VehicleRequestCalendarProps) => {
  // Group requests by date
  const requestsByDate = React.useMemo(() => {
    const grouped = new Map<string, VehicleRequest[]>();
    requests.forEach((request) => {
      const dateKey = format(
        parseISO(request.startDate as unknown as string),
        "yyyy-MM-dd",
      );
      const existing = grouped.get(dateKey) || [];
      grouped.set(dateKey, [...existing, request]);
    });
    return grouped;
  }, [requests]);

  // Custom day render to show requests
  const renderDay = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const dayRequests = requestsByDate.get(dateKey) || [];

    if (dayRequests.length === 0) return null;

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative w-full h-full">
            <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
              {dayRequests.slice(0, 3).map((request, i) => (
                <div
                  key={request.id}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    getStatusColor(request.status),
                  )}
                />
              ))}
              {dayRequests.length > 3 && (
                <div className="h-1 w-1 rounded-full bg-gray-400" />
              )}
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              {format(day, "MMMM d, yyyy")}
            </h4>
            <div className="space-y-1">
              {dayRequests.map((request) => (
                <div
                  key={request.id}
                  className="text-sm flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{request.requesterName}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      - {request.vehicleType}
                    </span>
                  </div>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vehicle Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="default">Approved</Badge>
            <Badge variant="destructive">Rejected</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          onSelect={onDateSelect}
          className="rounded-md border"
          components={{
            Day: ({ day, ...props }) => (
              <div {...props}>
                {format(day, "d")}
                {renderDay(day)}
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default VehicleRequestCalendar;
