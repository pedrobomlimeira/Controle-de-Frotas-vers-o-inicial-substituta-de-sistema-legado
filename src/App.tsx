import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Trips from "./components/trips/TripForm";
import Vehicles from "./components/vehicles/VehicleForm";
import Drivers from "./components/drivers/DriverForm";
import Maintenance from "./components/maintenance/MaintenanceForm";
import Expenses from "./components/expenses/ExpenseForm";
import Reports from "./components/reports/ReportForm";
import routes from "tempo-routes";

function App() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
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
