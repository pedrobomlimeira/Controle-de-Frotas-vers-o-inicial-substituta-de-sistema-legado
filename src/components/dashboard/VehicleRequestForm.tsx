import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Users, AlertCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vehicleRequestsApi } from "@/lib/api/vehicle-requests";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VehicleRequestFormProps {
  companyId: string;
  userId: string;
  userEmail: string;
  userName: string;
  onSubmit?: (data: any) => void;
}

const VehicleRequestForm = ({
  companyId,
  userId,
  userEmail,
  userName,
  onSubmit,
}: VehicleRequestFormProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [vehicleType, setVehicleType] = React.useState("");
  const [passengers, setPassengers] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isChecking, setIsChecking] = React.useState(false);
  const [availability, setAvailability] = React.useState<{
    available: boolean;
    conflicts?: any[];
  }>();

  // Check availability when dates or vehicle type changes
  React.useEffect(() => {
    const checkAvailability = async () => {
      if (!startDate || !endDate || !vehicleType) return;

      setIsChecking(true);
      try {
        const result = await vehicleRequestsApi.checkAvailability({
          companyId,
          vehicleType,
          startDate: new Date(
            `${format(startDate, "yyyy-MM-dd")}T${startTime}`,
          ),
          endDate: new Date(`${format(endDate, "yyyy-MM-dd")}T${endTime}`),
        });
        setAvailability(result);
      } catch (error) {
        console.error("Failed to check availability:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAvailability();
  }, [startDate, endDate, startTime, endTime, vehicleType, companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate || !startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please select both start and end dates and times",
        variant: "destructive",
      });
      return;
    }

    try {
      const request = await vehicleRequestsApi.create({
        companyId,
        requesterId: userId,
        requesterName: userName,
        requesterEmail: userEmail,
        vehicleType,
        startDate: new Date(`${format(startDate, "yyyy-MM-dd")}T${startTime}`),
        endDate: new Date(`${format(endDate, "yyyy-MM-dd")}T${endTime}`),
        destination,
        purpose,
        numberOfPassengers: parseInt(passengers, 10),
        notes,
      });

      toast({
        title: "Success",
        description: "Vehicle request submitted successfully",
      });

      onSubmit?.(request);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit vehicle request",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Request Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Start Date & Time</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  className="w-[150px]"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>End Date & Time</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  className="w-[150px]"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Passengers */}
            <div className="space-y-2">
              <Label>Number of Passengers</Label>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min="1"
                  placeholder="Enter number"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                />
              </div>
            </div>

            {/* Destination */}
            <div className="col-span-2 space-y-2">
              <Label>Destination</Label>
              <Input
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Purpose */}
            <div className="col-span-2 space-y-2">
              <Label>Purpose of Trip</Label>
              <Textarea
                placeholder="Describe the purpose of your trip"
                className="min-h-[100px]"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>

            {/* Additional Notes */}
            <div className="col-span-2 space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Any additional requirements or notes"
                className="min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Availability Alert */}
            {availability && !isChecking && (
              <div className="col-span-2">
                <Alert
                  variant={availability.available ? "default" : "destructive"}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {availability.available
                      ? "Vehicle is available for the selected time period"
                      : "Vehicle is not available for the selected time period"}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                setStartTime("");
                setEndTime("");
                setVehicleType("");
                setPassengers("");
                setDestination("");
                setPurpose("");
                setNotes("");
                setAvailability(undefined);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isChecking ||
                (availability && !availability.available) ||
                !startDate ||
                !endDate ||
                !startTime ||
                !endTime ||
                !vehicleType ||
                !destination ||
                !purpose
              }
            >
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleRequestForm;
