import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VehicleRequest } from "@/types/vehicle-request";
import { format, parseISO } from "date-fns";
import { vehicleRequestsApi } from "@/lib/api/vehicle-requests";
import { emailService } from "@/lib/email";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface VehicleRequestApprovalProps {
  requests: VehicleRequest[];
  currentUserId: string;
  onRequestUpdated?: (request: VehicleRequest) => void;
}

const VehicleRequestApproval = ({
  requests,
  currentUserId,
  onRequestUpdated,
}: VehicleRequestApprovalProps) => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] =
    React.useState<VehicleRequest | null>(null);
  const [action, setAction] = React.useState<"approve" | "reject" | null>(null);

  const handleAction = async (
    request: VehicleRequest,
    action: "approve" | "reject",
  ) => {
    try {
      const updatedRequest = await vehicleRequestsApi.updateStatus(request.id, {
        status: action === "approve" ? "approved" : "rejected",
        approvedBy: currentUserId,
      });

      // Send email notification
      await emailService.sendRequesterNotification(updatedRequest);

      toast({
        title: "Success",
        description: `Request ${action}d successfully`,
      });

      onRequestUpdated?.(updatedRequest);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} request`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requester</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.requesterName}
                </TableCell>
                <TableCell>{request.vehicleType}</TableCell>
                <TableCell>
                  {format(
                    parseISO(request.startDate as unknown as string),
                    "PPP",
                  )}{" "}
                  -{" "}
                  {format(
                    parseISO(request.endDate as unknown as string),
                    "PPP",
                  )}
                </TableCell>
                <TableCell>{request.destination}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  {request.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAction("approve");
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Approve Request</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to approve this vehicle
                              request? This will notify the requester.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                selectedRequest &&
                                handleAction(selectedRequest, "approve")
                              }
                            >
                              Approve
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAction("reject");
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reject Request</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to reject this vehicle
                              request? This will notify the requester.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                selectedRequest &&
                                handleAction(selectedRequest, "reject")
                              }
                            >
                              Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VehicleRequestApproval;
