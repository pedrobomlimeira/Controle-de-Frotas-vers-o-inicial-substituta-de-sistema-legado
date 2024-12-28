import React from "react";
import Sidebar from "./layout/Sidebar";
import CompanySelector from "./layout/CompanySelector";
import FleetStatusGrid from "./dashboard/FleetStatusGrid";
import ActiveTripsTable from "./dashboard/ActiveTripsTable";
import MaintenanceSchedule from "./dashboard/MaintenanceSchedule";

const Home = () => {
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

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>

          <FleetStatusGrid />

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <ActiveTripsTable />
            <MaintenanceSchedule />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
