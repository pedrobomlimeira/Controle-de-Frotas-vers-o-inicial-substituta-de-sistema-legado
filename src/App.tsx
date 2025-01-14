import React, { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { vehicleRequestsApi } from "@/lib/api/vehicle-requests";
import { vehiclesApi } from "@/lib/api/vehicles";
import { driversApi } from "@/lib/api/drivers";
import { maintenanceApi } from "@/lib/api/maintenance";
import Home from "./components/home";
import Trips from "./components/trips/TripForm";
import Vehicles from "./components/vehicles/VehicleForm";
import Drivers from "./components/drivers/DriverForm";
import Maintenance from "./components/maintenance/MaintenanceForm";
import Expenses from "./components/expenses/ExpenseForm";
import Reports from "./components/reports/ReportForm";
import routes from "tempo-routes";

function App() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Determine which API to call based on the form type
      let response;
      if (data.vehicleId) {
        // Trip form
        response = await vehicleRequestsApi.create(data);
      } else if (data.plate) {
        // Vehicle form
        response = await vehiclesApi.create(data);
      } else if (data.licenseNumber) {
        // Driver form
        response = await driversApi.create(data);
      } else if (data.maintenanceType) {
        // Maintenance form
        response = await maintenanceApi.create(data);
      }

      toast({
        title: "Success",
        description: "Record created successfully",
      });
      
      // Optionally redirect or refresh data
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create record",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips onSubmit={handleSubmit} vehicles={[]} drivers={[]} />} />
          <Route path="/vehicles" element={<Vehicles onSubmit={handleSubmit} />} />
          <Route path="/drivers" element={<Drivers onSubmit={handleSubmit} />} />
          <Route path="/maintenance" element={<Maintenance onSubmit={handleSubmit} vehicles={[]} />} />
          <Route path="/expenses" element={<Expenses onSubmit={handleSubmit} />} />
          <Route path="/reports" element={<Reports onSubmit={handleSubmit} />} />
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
