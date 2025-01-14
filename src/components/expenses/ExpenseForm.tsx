import React from 'react';

interface ExpenseFormProps {
  onSubmit: (data: any) => void;
}

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Expenses Management</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({});
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Expense Type</label>
              <select className="w-full p-2 border rounded">
                <option>Fuel</option>
                <option>Maintenance</option>
                <option>Insurance</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input 
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter expense description"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Expense
          </button>
        </form>
      </div>
    </div>
  );
}
