import React from "react";
import Sidebar from "./layout/Sidebar";
import CompanySelector from "./layout/CompanySelector";
import FleetStatusGrid from "./dashboard/FleetStatusGrid";
import ActiveTripsTable from "./dashboard/ActiveTripsTable";
import MaintenanceSchedule from "./dashboard/MaintenanceSchedule";
import VehicleRequestForm from "./dashboard/VehicleRequestForm";
import VehicleRequestCalendar from "./dashboard/VehicleRequestCalendar";
import VehicleRequestApproval from "./dashboard/VehicleRequestApproval";

const Home = () => {
  // Mock user data - replace with actual auth data
  const mockUser = {
    id: "user-1",
    email: "user@example.com",
    name: "John Doe",
  };

  // Mock company data - replace with selected company
  const mockCompany = {
    id: "company-1",
  };

  // Mock requests data - replace with API data
  const mockRequests = [
    {
      id: "1",
      companyId: "company-1",
      requesterId: "user-2",
      requesterName: "Jane Smith",
      requesterEmail: "jane@example.com",
      vehicleType: "car",
      startDate: new Date(2024, 1, 15).toISOString(),
      endDate: new Date(2024, 1, 16).toISOString(),
      destination: "Airport",
      purpose: "Client pickup",
      numberOfPassengers: 2,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      companyId: "company-1",
      requesterId: "user-3",
      requesterName: "Bob Wilson",
      requesterEmail: "bob@example.com",
      vehicleType: "van",
      startDate: new Date(2024, 1, 17).toISOString(),
      endDate: new Date(2024, 1, 17).toISOString(),
      destination: "Conference Center",
      purpose: "Team event",
      numberOfPassengers: 8,
      status: "approved",
      createdAt: new Date().toISOString(),
    },
  ];

  const handleRequestSubmit = (request: any) => {
    console.log("New request:", request);
    // Update requests list
  };

  const handleRequestUpdate = (request: any) => {
    console.log("Updated request:", request);
    // Update requests list
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/75 border-b p-4">
          <div className="flex items-center justify-between max-w-full mx-auto">
            <CompanySelector />
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>

          <FleetStatusGrid />

          <div className="grid gap-6 lg:grid-cols-2">
            <VehicleRequestForm
              companyId={mockCompany.id}
              userId={mockUser.id}
              userEmail={mockUser.email}
              userName={mockUser.name}
              onSubmit={handleRequestSubmit}
            />
            <div className="space-y-6">
              <VehicleRequestCalendar requests={mockRequests} />
              <VehicleRequestApproval
                requests={mockRequests}
                currentUserId={mockUser.id}
                onRequestUpdated={handleRequestUpdate}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-1">
            <ActiveTripsTable />
            <MaintenanceSchedule />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
