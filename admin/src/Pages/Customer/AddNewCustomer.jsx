import React, { useState } from "react";

const AddNewCustomer = () => {
    const [formData, setFormData] = useState({
        Date: "",
        customerName: "",
        email: "",
        contactNo: "",
        streetAddress: "",
        province: "",
        city: "",
        zipCode: "",
        propertyType: "",
        title: "",
        propertySizeType: "",
        propertyTypePrice: "",
        propertyAddress: "",
        agent: "",
    });

    const [customers, setCustomers] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddCustomer = () => {
        setCustomers([...customers, formData]);
        resetForm();
    };

    const handleEditCustomer = (index) => {
        setFormData(customers[index]);
        setIsEditMode(true);
        setEditingIndex(index);
    };

    const handleUpdateCustomer = () => {
        const updatedCustomers = customers.map((customer, index) =>
            index === editingIndex ? formData : customer
        );
        setCustomers(updatedCustomers);
        setIsEditMode(false);
        setEditingIndex(null);
        resetForm();
    };

    const handleDeleteCustomer = (index) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
    };

    const resetForm = () => {
        setFormData({
            Date: "",
            customerName: "",
            email: "",
            contactNo: "",
            streetAddress: "",
            province: "",
            city: "",
            zipCode: "",
            propertyType: "",
            title: "",
            propertySizeType: "",
            propertyTypePrice: "",
            propertyAddress: "",
            agent: "",
        });
    };

    return (
        <div className="p-8 bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-black font-bold mb-2 block">Date</label>
                    <input
                        type="date"
                        name="Date"
                        value={formData.Date}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Customer Name</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Contact No</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Street Address</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Province</label>
                    <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Property Type</label>
                    <input
                        type="text"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Property Size Type</label>
                    <input
                        type="text"
                        name="propertySizeType"
                        value={formData.propertySizeType}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Property Price</label>
                    <input
                        type="text"
                        name="propertyTypePrice"
                        value={formData.propertyTypePrice}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Property Address</label>
                    <input
                        type="text"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                <div>
                    <label className="text-black font-bold mb-2 block">Agent</label>
                    <input
                        type="text"
                        name="agent"
                        value={formData.agent}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>
            </div>

            <div className="mt-6">
                {!isEditMode ? (
                    <button
                        onClick={handleAddCustomer}
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Add Customer
                    </button>
                ) : (
                    <button
                        onClick={handleUpdateCustomer}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Update Customer
                    </button>
                )}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Customer List</h2>
{customers.length === 0 ? (
  <p>No customers added yet.</p>
) : (
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4 border">Date</th>
        <th className="py-2 px-4 border">Customer Name</th>
        <th className="py-2 px-4 border">Email</th>
        <th className="py-2 px-4 border">Contact No</th>
        <th className="py-2 px-4 border">Street Address</th>
        <th className="py-2 px-4 border">Province</th>
        <th className="py-2 px-4 border">City</th>
        <th className="py-2 px-4 border">Zip Code</th>
        <th className="py-2 px-4 border">Property Type</th>
        <th className="py-2 px-4 border">Title</th>
        <th className="py-2 px-4 border">Property Size Type</th>
        <th className="py-2 px-4 border">Property Price</th>
        <th className="py-2 px-4 border">Property Address</th>
        <th className="py-2 px-4 border">Agent</th>
        <th className="py-2 px-4 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer, index) => (
        <tr key={index} className="border-t">
          <td className="py-2 px-4 border">{customer.Date}</td>
          <td className="py-2 px-4 border">{customer.customerName}</td>
          <td className="py-2 px-4 border">{customer.email}</td>
          <td className="py-2 px-4 border">{customer.contactNo}</td>
          <td className="py-2 px-4 border">{customer.streetAddress}</td>
          <td className="py-2 px-4 border">{customer.province}</td>
          <td className="py-2 px-4 border">{customer.city}</td>
          <td className="py-2 px-4 border">{customer.zipCode}</td>
          <td className="py-2 px-4 border">{customer.propertyType}</td>
          <td className="py-2 px-4 border">{customer.title}</td>
          <td className="py-2 px-4 border">{customer.propertySizeType}</td>
          <td className="py-2 px-4 border">{customer.propertyTypePrice}</td>
          <td className="py-2 px-4 border">{customer.propertyAddress}</td>
          <td className="py-2 px-4 border">{customer.agent}</td>
          <td className="py-2 px-4 border">
            <button
              onClick={() => handleEditCustomer(index)}
              className="bg-yellow-500 text-white p-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCustomer(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

          
          
        </div>
    );
};

export default AddNewCustomer;
