import React from 'react';

interface ReportFormProps {
  onSubmit: (data: any) => void;
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
            <p className="text-sm text-gray-600 mb-4">
              Generate a detailed report of monthly expenses
            </p>
            <button
              onClick={() => onSubmit({ type: 'monthly-expenses' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Report
            </button>
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Vehicle Maintenance</h2>
            <p className="text-sm text-gray-600 mb-4">
              View maintenance history and upcoming schedules
            </p>
            <button
              onClick={() => onSubmit({ type: 'maintenance' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Report
            </button>
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Driver Performance</h2>
            <p className="text-sm text-gray-600 mb-4">
              Analyze driver performance metrics
            </p>
            <button
              onClick={() => onSubmit({ type: 'driver-performance' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Report
            </button>
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Fuel Consumption</h2>
            <p className="text-sm text-gray-600 mb-4">
              View fuel usage statistics and trends
            </p>
            <button
              onClick={() => onSubmit({ type: 'fuel-consumption' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
