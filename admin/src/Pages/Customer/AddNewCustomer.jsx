// import React, { useState } from "react";

// const AddNewCustomer = ({ onAddCustomer }) => {
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     Date: "",
//     customerName: "",
//     email: "",
//     contactNo: "",
//     streetAddress: "",
//     province: "",
//     city: "",
//     zipCode: "",
//     propertyType: "",
//     title: "",
//     propertySizeType: "",
//     propertyTypePrice: "",
//     propertyAddress: "",
//     agent: "",
//   });

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Call the passed in function to add the new customer
//     onAddCustomer(formData);
//     // Reset the form data after submission
//     setFormData({
//       Date: "",
//       customerName: "",
//       email: "",
//       contactNo: "",
//       streetAddress: "",
//       province: "",
//       city: "",
//       zipCode: "",
//       propertyType: "",
//       title: "",
//       propertySizeType: "",
//       propertyTypePrice: "",
//       propertyAddress: "",
//       agent: "",
//     });
//   };

//   return (
//     <div className="p-8 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Date</label>
//           <input
//             type="date"
//             name="Date"
//             placeholder="Select Date"
//             value={formData.Date}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Customer Name</label>
//           <input
//             type="text"
//             name="customerName"
//             placeholder="Customer Name"
//             value={formData.customerName}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Contact No</label>
//           <input
//             type="tel"
//             name="contactNo"
//             placeholder="Contact No"
//             value={formData.contactNo}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Street Address</label>
//           <input
//             type="text"
//             name="streetAddress"
//             placeholder="Street Address"
//             value={formData.streetAddress}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Province</label>
//           <input
//             type="text"
//             name="province"
//             placeholder="Province"
//             value={formData.province}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">City/Town</label>
//           <input
//             type="text"
//             name="city"
//             placeholder="City/Town"
//             value={formData.city}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Zip Code</label>
//           <input
//             type="text"
//             name="zipCode"
//             placeholder="Zip Code"
//             value={formData.zipCode}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <h2 className="text-2xl font-bold mb-6 mt-8">Property Details</h2>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Property Type</label>
//           <input
//             type="text"
//             name="propertyType"
//             placeholder="Property Type"
//             value={formData.propertyType}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Title</label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Property Size Type</label>
//           <input
//             type="text"
//             name="propertySizeType"
//             placeholder="Property Size Type"
//             value={formData.propertySizeType}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Property Type Price</label>
//           <input
//             type="number"
//             name="propertyTypePrice"
//             placeholder="Property Type Price"
//             value={formData.propertyTypePrice}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Property Address</label>
//           <input
//             type="text"
//             name="propertyAddress"
//             placeholder="Property Address"
//             value={formData.propertyAddress}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="mb-6 flex">
//           <label className="text-black font-bold mb-2 w-1/6">Agent</label>
//           <input
//             type="text"
//             name="agent"
//             placeholder="Agent Name"
//             value={formData.agent}
//             onChange={handleFormChange}
//             className="w-full p-2 border rounded bg-[#D9D9D9]"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Customer
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddNewCustomer;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewCustomer from "./AddNewCustomer"; // Import the AddNewCustomer component

const CustomerOverviewTable = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", joinDate: "2023-01-15", address: "123 Main St", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", joinDate: "2023-02-22", address: "456 Oak St", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-123-7890", joinDate: "2023-03-10", address: "789 Pine St", status: "Active" },
  ]);

  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const handleNewCustomerClick = () => {
    navigate("/add-new-customer");
  };

  // Function to add a new customer
  const addCustomer = (newCustomer) => {
    setCustomers((prev) => [
      ...prev,
      { id: prev.length + 1, ...newCustomer, joinDate: new Date().toISOString().split("T")[0], status: "Active" }
    ]);
    navigate("/"); // Navigate back to the overview table after adding the customer
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Customer Details</h1>

      {/* Button to add a new customer */}
      <div className="flex justify-end mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleNewCustomerClick}>
          New Customer
        </button>
      </div>

      {/* Customer table */}
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
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render AddNewCustomer component conditionally */}
      <AddNewCustomer onAddCustomer={addCustomer} />
    </div>
  );
};

export default CustomerOverviewTable;
