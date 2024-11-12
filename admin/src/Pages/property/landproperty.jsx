import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { FaEdit } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgUploader from '../../assets/profile.png'; 
import axios from "axios";
import config from "../../config";

const LandProperty = () => {
    const navigate = useNavigate();
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [images, setImages] = useState(Array(6).fill(""));
    const [video, setVideo] = useState(null);
    
    const [formData, setFormData] = useState({
      type: "land",
      city: "",
      title: "",
      titleDescription: "",
      address: "",
      price: "",
      sizeCount: "",
      agent: "",
      map: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      parking: "",
      squareFeet: "",
      sizeType: "",
      size: "",
      priceType: "",
      pricePerUnit: "",
    });

    const handleSave = async () => {
      try {
        const data = new FormData();

        // Append form data
        for (const [key, value] of Object.entries(formData)) {
          if (value !== "") data.append(key, value);
        }

        images.forEach((image, index) => {
          if (image) {
            const file = new File([image], `photo${index}.jpg`, {
              type: "image/jpeg",
            });
            data.append("photos", file);
          }
        });

        if (video) data.append("videos", video);

        // Detailed logging for debugging
        console.log("FormData Entries:", Array.from(data.entries()));

        const response = await axios.post(
          `${config.API_URL}/property/`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        console.log("Response:", response.data);
        console.log("Response Status Code:", response.status);

        if (response.status === 201) {
          alert("Land Data saved successfully!");
          // Clear input fields
          setFormData({
            type: "land",
            city: "",
            title: "",
            titleDescription: "",
            address: "",
            price: "",
            sizeCount: "",
            agent: "",
            map: "",
            description: "",
            bedrooms: "",
            bathrooms: "",
            parking: "",
            squareFeet: "",
            sizeType: "",
            size: "",
            priceType: "",
            pricePerUnit: "",
            photos: [],
            videos: [],
          });
          setImages(Array(6).fill(""));
          setFullScreenImage("");
          setVideo(null);
        } else {
          alert("Failed to save data: " + response.data.message);
        }
      } catch (error) {
        console.error("Error saving data:", error.response?.data || error);
        alert(
          "Failed to save data: " +
            (error.response?.data?.message || "Internal Server Error"),
        );
      }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleFullScreenImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFullScreenImage(reader.result);
                const updatedImages = [...images];
                updatedImages[0] = reader.result; 
                setImages(updatedImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedImages = [...images];
                updatedImages[index] = reader.result;
                setImages(updatedImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = () => {
        console.log("Editing data:", formData);
        alert("Edit mode enabled!");
    };

    const handleDelete = () => {
        console.log("Deleting data:", formData);
        if (window.confirm("Are you sure you want to delete this property?")) {
            alert("Data deleted!");
            setFormData({
                city: "",
                title: "",
                titleDescription: "",
                address: "",
                price: "",
                sizeType: "",
                sizeCount: "",
                agent: "",
                map: "",
                description: "",
                bedrooms: "",
                bathrooms: "",
                parking: "",
                squareFeet: "",
            });
            setImages(Array(6).fill(""));
            setFullScreenImage("");
            setVideo(null);
        }
    };

    return (
      <div className="flex flex-col min-h-screen bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-between mb-6 items-center">
          <div className="flex gap-1 sm:gap-1 items-center mb-4 sm:mb-0">
            <ChevronLeftIcon
              className="text-black cursor-pointer"
              style={{ width: "30px", height: "30px" }}
              onClick={handleBackClick}
            />
            <h1 className="text-2xl sm:text-1xl font-bold text-black">
              New Land
            </h1>
          </div>
        </div>

        <div className="relative w-full h-80 mb-6 bg-gray-200 flex items-center justify-center">
          {fullScreenImage ? (
            <img
              src={fullScreenImage}
              alt="Full Screen"
              className="w-full h-full object-cover"
            />
          ) : (
            <label className="cursor-pointer text-center text-black">
              <input
                type="file"
                className="hidden"
                onChange={handleFullScreenImageChange}
              />
              <img
                src={ImgUploader}
                alt="Uploader"
                className="w-full h-full object-cover"
              />
            </label>
          )}
        </div>

        <div className="grid grid-cols-6 gap-4 mt-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative bg-[#d9d9d9] h-40 flex items-center justify-center"
            >
              {image ? (
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <label className="cursor-pointer text-black">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => handleImageChange(index, event)}
                    id={`file-input-${index}`}
                  />
                  <img
                    src={ImgUploader}
                    alt="Uploader"
                    className="w-full h-full object-cover"
                  />
                </label>
              )}
              {index !== 0 && (
                <FaEdit
                  className="absolute top-2 right-2 text-black cursor-pointer w-6 h-6"
                  onClick={() =>
                    document.querySelector(`#file-input-${index}`).click()
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex-grow" />

        <div className="mt-16">
          <div className="mb-6">
            <label className="block text-black font-bold mb-2">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full p-2 border border-white rounded text-red-900"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            >
              <option value="">Select City</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
              <option value="Negombo">Negombo</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Matara">Matara</option>
              <option value="Badulla">Badulla</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Mannar">Mannar</option>
              <option value="Hambantota">Hambantota</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Ratnapura">Ratnapura</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Text Here..."
              value={formData.title}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">
              Title Description
            </label>
            <textarea
              name="titleDescription"
              rows={5}
              placeholder="Text Here..."
              value={formData.titleDescription}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Text Here..."
              value={formData.address}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Price</label>
            <input
              type="text"
              name="price"
              placeholder="RS.000.000"
              value={formData.price}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-black font-bold mb-2">
                Property Size Type
              </label>
              <select
                name="sizeType"
                value={formData.sizeType}
                onChange={handleFormChange}
                className="p-2 border rounded bg-[#D9D9D9]"
              >
                <option value="">Select Size Type</option>
                <option value="acres">Acres</option>
                <option value="perch">Perch</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-black font-bold mb-2">
                Property Size Amount
              </label>
              <input
                type="number"
                name="size"
                placeholder="Enter Size Amount"
                value={formData.size}
                onChange={handleFormChange}
                className="p-2 border rounded bg-[#D9D9D9]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-black font-bold mb-2">
                Property Price Type
              </label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleFormChange}
                className="p-2 border rounded bg-[#D9D9D9]"
              >
                <option value="">Select Price Type</option>
                <option value="per_acre">Per Acre</option>
                <option value="per_perch">Per Perch</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-bold mb-2">
                Property Price per unit
              </label>
              <input
                type="number"
                name="pricePerUnit"
                placeholder="Enter Property Price"
                value={formData.pricePerUnit}
                onChange={handleFormChange}
                className="w-full p-2 border rounded bg-[#D9D9D9]"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Agent</label>
            <input
              type="text"
              name="agent"
              placeholder="Agent Name"
              value={formData.agent}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Map</label>
            <input
              type="text"
              name="map"
              placeholder="Map Link Here..."
              value={formData.map}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-black font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="Text Here..."
              value={formData.description}
              onChange={handleFormChange}
              className="w-full p-2 border rounded bg-[#D9D9D9]"
            />
          </div>

          <div className="flex center mt-4 gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-3 rounded"
            >
              Save
            </button>
            {/* <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white p-3 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-3 rounded"
            >
              Delete
            </button> */}
          </div>
        </div>
      </div>
    );
};

export default LandProperty;
