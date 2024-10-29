import React, { useState } from "react";

const AddNewCustomer = ({ onAddCustomer }) => {
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCustomer(formData);
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
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Date</label>
          <input
            type="date"
            name="Date"
            placeholder="Select Date"
            value={formData.Date}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Customer Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Contact No</label>
          <input
            type="tel"
            name="contactNo"
            placeholder="Contact No"
            value={formData.contactNo}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Province</label>
          <input
            type="text"
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">City/Town</label>
          <input
            type="text"
            name="city"
            placeholder="City/Town"
            value={formData.city}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-8">Property Details</h2>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Property Type</label>
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type"
            value={formData.propertyType}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Property Size Type</label>
          <input
            type="text"
            name="propertySizeType"
            placeholder="Property Size Type"
            value={formData.propertySizeType}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Property Type Price</label>
          <input
            type="number"
            name="propertyTypePrice"
            placeholder="Property Type Price"
            value={formData.propertyTypePrice}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Property Address</label>
          <input
            type="text"
            name="propertyAddress"
            placeholder="Property Address"
            value={formData.propertyAddress}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="mb-6 flex">
          <label className="text-black font-bold mb-2 w-1/6">Agent</label>
          <input
            type="text"
            name="agent"
            placeholder="Agent Name"
            value={formData.agent}
            onChange={handleFormChange}
            className="w-full p-2 border rounded bg-[#D9D9D9]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCustomer;


