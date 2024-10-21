import React, { useState } from "react";

const customerData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", joinDate: "2023-01-15", address: "123 Main St", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", joinDate: "2023-02-22", address: "456 Oak St", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-123-7890", joinDate: "2023-03-10", address: "789 Pine St", status: "Active" },
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", joinDate: "2023-01-15", address: "123 Main St", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", joinDate: "2023-02-22", address: "456 Oak St", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-123-7890", joinDate: "2023-03-10", address: "789 Pine St", status: "Active" },
];

const CustomerOverviewTable = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Customer Details</h1>

      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="date" className="font-semibold text-gray-700">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border rounded bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="status" className="font-semibold text-gray-700">Filter Status:</label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Export
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            New Customer
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer ID</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Name</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact No</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Join Date</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Address</th>
              <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 bg-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{customer.id}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{customer.name}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{customer.email}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{customer.phone}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{customer.joinDate}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{customer.address}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOverviewTable;
