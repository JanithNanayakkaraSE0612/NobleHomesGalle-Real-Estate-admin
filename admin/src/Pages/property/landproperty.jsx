import { ChevronLeftIcon } from "@heroicons/react/16/solid/index.js";
import { FaEdit } from "react-icons/fa";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ImgUploader from '../../assets/IMGUploader.png';

const landproperty = () => {
    const navigate = useNavigate();
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [images, setImages] = useState(Array(6).fill(""));
    const [video, setVideo] = useState(null);

    const [formData, setFormData] = useState({
        city: "",
        title: "",
        titleDescription: "",
        address: "",
        price: "",
        sizeType: "",
        sizeCount: "",
        agent: "",
        map:'',
        description: "",
    });

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleFullScreenImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFullScreenImage(reader.result);

                // Also set the first image (image1) in the grid to this image
                const updatedImages = [...images];
                updatedImages[0] = reader.result; // Set image1 to the uploaded full screen image
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



    return (
        <div className="p-4 bg-white min-h-screen">
            {/* Header with back button */}
            <div className="flex flex-col sm:flex-row justify-between mb-6 items-center">
                <div className="flex gap-1 sm:gap-1 items-center mb-4 sm:mb-0">
                    <ChevronLeftIcon
                        className="text-black cursor-pointer"
                        style={{ width: "50px", height: "50px" }}
                        onClick={handleBackClick}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-black"> New Land</h1>
                </div>
            </div>

            {/* Full Screen Image */}
            <div className="relative w-full h-screen mb-6 bg-gray-200 flex items-center justify-center">
                {fullScreenImage ? (
                    <img src={fullScreenImage} alt="Full Screen" className="w-full h-full object-cover" />
                ) : (
                    <label className="cursor-pointer text-center text-black">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFullScreenImageChange}
                        />
                        <img src={ImgUploader} alt="Uploader" className="w-full h-full object-cover" />
                        <FaEdit
                            className="absolute top-2 right-2 text-black cursor-pointer w-6 h-6"
                            onClick={() => document.querySelector(#file-input-0).click()}
                        />
                    </label>
                )}
            </div>

            {/* Image Uploaders Grid */}
            <div className="grid grid-cols-6 gap-4 mt-12">
                {images.map((image, index) => (
                    <div key={index} className="relative bg-[#d9d9d9] h-40 flex items-center justify-center">
                        {image ? (
                            <img src={image} alt={Uploaded ${index}} className="w-full h-full object-cover" />
                        ) : (
                            <label className="cursor-pointer text-black">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(event) => handleImageChange(index, event)}
                                    id={file-input-${index}} // Assign a unique ID to each file input
                                />
                                <img src={ImgUploader} alt="Uploader" className="w-full h-full object-cover" />
                            </label>
                        )}

                        {/* Hide the edit icon for image1 (index 0) */}
                        {index !== 0 && (
                            <FaEdit
                                className="absolute top-2 right-2 text-black cursor-pointer w-6 h-6"
                                onClick={() => document.querySelector(#file-input-${index}).click()}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Form for Additional Information */}
            <div className="mt-16">
                {/* Video Uploader */}
                <div className="mb-6 flex">
                    <label className="block text-black font-bold mb-2 w-1/6">Upload Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="w-full p-2 border border-white rounded text-red-900"
                    />
                </div>

                {/* City */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">City</label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    >
                        <option value="">Select City</option>
                        <option value="City1">City1</option>
                        <option value="City2">City2</option>
                    </select>
                </div>


                {/* Title */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder={'Text Here...'}
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>


                {/* Title Description */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Title Description</label>
                    <textarea
                        name="titleDescription"
                        rows={5}
                        placeholder={'Text Here...'}
                        value={formData.titleDescription}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                {/* Address */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder={'Text Here...'}
                        value={formData.address}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4 flex">
                        <label className="text-black font-bold mb-2 w-1/3">Price</label>
                        <select
                            name="sizeType"
                            value={formData.sizeType}
                            onChange={handleFormChange}
                            className="w-4/5 p-2 border rounded bg-[#D9D9D9]"
                        >
                            <option value="">Per Acres</option>
                            <option value="hectares">Per Hectares</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            name="price"
                            placeholder={'RS.000.000'}
                            value={formData.price}
                            onChange={handleFormChange}
                            className="w-full p-2 border rounded bg-[#D9D9D9]"
                        />
                    </div>

                    <div className="mb-4 flex">
                        <label className="text-black font-bold mb-2 w-1/3">Size Type</label>
                        <select
                            name="sizeType"
                            value={formData.sizeType}
                            onChange={handleFormChange}
                            className="w-4/5 p-2 border rounded bg-[#D9D9D9]"
                        >
                            <option value="">Per Acres</option>
                            <option value="hectares">Per Hectares</option>
                        </select>
                    </div>

                    <div className="mb-4 flex">
                        <input
                            type="text"
                            name="price"
                            value={formData.sizeCount}
                            onChange={handleFormChange}
                            className="w-full p-2 border rounded bg-[#D9D9D9]"
                        />
                    </div>
                </div>

                {/* Agent */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Agent</label>
                    <select
                        name="agent"
                        value={formData.agent}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    >
                        <option value="">Select Agent</option>
                        <option value="Agent1">Agent 1</option>
                        <option value="Agent2">Agent 2</option>
                    </select>
                </div>

                {/* Map */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Map  </label>
                    <input
                        type="text"
                        name="price"
                        placeholder={'Drop Link...'}
                        value={formData.map}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>

                {/* Description */}
                <div className="mb-6 flex">
                    <label className="text-black font-bold mb-2 w-1/6">Description</label>
                    <textarea
                        name="titleDescription"
                        rows={10}
                        placeholder={'Text Here...'}
                        value={formData.description}
                        onChange={handleFormChange}
                        className="w-full p-2 border rounded bg-[#D9D9D9]"
                    />
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <button className="bg-[#6EA3F8] text-white font-bold py-2 px-4 rounded mx-2">
                    Save
                </button>
                <button className="bg-[#F95B65] text-white font-bold py-2 px-4 rounded mx-2">
                    Delete
                </button>
            </div>

        </div>
    );
};

export default landproperty;