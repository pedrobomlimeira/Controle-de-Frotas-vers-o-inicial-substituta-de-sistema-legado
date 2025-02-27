import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Trips from "./components/trips/TripForm";
import Vehicles from "./components/vehicles/VehicleForm";
import Drivers from "./components/drivers/DriverForm";
import Maintenance from "./components/maintenance/MaintenanceForm";
import Expenses from "./components/expenses/ExpenseForm";
import Reports from "./components/reports/ReportForm";
<<<<<<< HEAD
import CompanyManagement from './components/company/CompanyManagement';
=======
import UsersList from "./components/users/UsersList";
import UserForm from "./components/users/UserForm";
>>>>>>> d4cfbb5 (Incluido menu Adm e nele o cadastro de usuarios)
import routes from "tempo-routes";
import UserManagement from './components/users/UserManagement'; // Adjust the import path as necessary

function App() {
  const handleSubmit = async (data: any) => {
    console.log('Form submitted:', data);

    // Assuming you have functions to fetch and update trips and maintenance
    if (data.tripId) {
        const trip = await fetchTrip(data.tripId); // Fetch the trip
        trip.expenses = [...(trip.expenses || []), ...data.expenses]; // Add new expenses
        await updateTrip(trip); // Update the trip with new expenses
    }

    if (data.maintenanceId) {
        const maintenance = await fetchMaintenance(data.maintenanceId); // Fetch the maintenance
        maintenance.expenses = [...(maintenance.expenses || []), ...data.expenses]; // Add new expenses
        await updateMaintenance(maintenance); // Update the maintenance with new expenses
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
          <Route path="/companies" element={<CompanyManagement />} />
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/new" element={<UserForm onSubmit={handleSubmit} />} />
          <Route path="/admin/users/:id" element={<UserForm onSubmit={handleSubmit} />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
