import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsBuildings } from "react-icons/bs";
import config from "../../config";

const ListLands = ({ property }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [landData, setLandData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editVideoId, setEditVideoId] = useState(null);

  //get all land properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/property/`);

      const filteredData = response.data.data.filter(
        (land) => land.type === "land",
      );

      setLandData(filteredData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePhotoEdit = (photoId) => {
    setEditPhotoId(photoId);
  };

  const handleVideoEdit = (videoId) => {
    setEditVideoId(videoId);
  };

  const handleEditClick = (land) => {
    setEditRowId(land._id);
    setEditValues(land);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo and video
  const handleFileChange = (e, photoId = null, videoId = null) => {
    const newFile = e.target.files[0];
    console.log(
      `Selected file for ${
        photoId ? "photoId " + photoId : "videoId " + videoId
      }:`,
      newFile,
    );

    if (photoId) {
      const updatedPhotos = editValues.photos.map((photo) =>
        photo._id === photoId ? { ...photo, file: newFile } : photo,
      );

      setEditValues((prev) => ({
        ...prev,
        photos: updatedPhotos,
      }));
    } else if (videoId) {
      const updatedVideos = editValues.videos.map((video) =>
        video._id === videoId ? { ...video, file: newFile } : video,
      );

      setEditValues((prev) => ({
        ...prev,
        videos: updatedVideos,
      }));
    }
  };

  //update property
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      Object.keys(editValues).forEach((key) => {
        if (key !== "photos" && key !== "videos") {
          formData.append(key, editValues[key]);
        }
      });

      const replacePhotoPromises = editValues.photos
        .filter((photo) => photo.file)
        .map((photo) => {
          const replaceFormData = new FormData();
          replaceFormData.append("photo", photo.file);
          return axios.put(
            `${config.API_URL}/property/replace/${editRowId}/photos/${photo.public_id}`,
            replaceFormData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        });

      // Handle video replace
      const replaceVideoPromises = editValues.videos
        .filter((video) => video.file)
        .map((video) => {
          const replaceFormData = new FormData();
          replaceFormData.append("video", video.file);
          return axios.put(
            `${config.API_URL}/property/replace/${editRowId}/videos/${video.public_id}`,
            replaceFormData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        });

      // other data update
      const updateResponse = await axios.put(
        `${config.API_URL}/property/update/${editRowId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const replacePhotoResponses = await Promise.all(replacePhotoPromises);
      console.log("Photo replace:", replacePhotoResponses);

      const replaceVideoResponses = await Promise.all(replaceVideoPromises);
      console.log("Video replace:", replaceVideoResponses);

      await fetchProperties();
      setEditRowId(null);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  //delete property
  const handleDelete = async (propertyId) => {
    console.log("Deleting property with ID:", propertyId);
    if (!propertyId) {
      alert("Property ID is missing!");
      return;
    }

    try {
      const response = await axios.delete(
        `${config.API_URL}/property/delete/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert("Property deleted successfully!");
        fetchProperties(); // Re-fetch properties after deletion
      } else {
        alert(
          `Failed to delete: ${response.data.message || "An error occurred"}`,
        );
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Server error. Please try again.");
    }
  };

  //delete photoes
  const handlePhotoDeletes = async (propertyId, photoPublicId) => {
    console.log(
      "Attempting to delete photo with Public ID:",
      photoPublicId,
      "for property ID:",
      propertyId,
    );

    // Additional logs
    // console.log("Property ID:", propertyId);
    // console.log("Photo Public ID:", photoPublicId);

    if (!photoPublicId) {
      alert("Photo Public ID is undefined!");
      return;
    }

    try {
      const response = await axios.delete(
        `${config.API_URL}/property/remove/${propertyId}/photos/${photoPublicId}`,
      );

      console.log("API response:", response); // Log the API response

      if (response.status === 200) {
        alert("Photo deleted successfully!");

        // Call fetchProperties to refresh the list
        await fetchProperties();
      } else {
        alert(
          `Failed to delete photo: ${
            response.data.message || "An error occurred"
          }`,
        );
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Server error. Please try again.");
    }
  };

  //delete video
  const handleVideoDeletes = async (propertyId, videoPublicId) => {
    console.log(
      "Attempting to delete video with Public ID:",
      videoPublicId,
      "for property ID:",
      propertyId,
    );

    if (!videoPublicId) {
      alert("Video Public ID is undefined!");
      return;
    }

    try {
      const response = await axios.delete(
        `${config.API_URL}/property/remove/${propertyId}/videos/${videoPublicId}`,
      );

      console.log("API response:", response); // Log the API response

      if (response.status === 200) {
        alert("Video deleted successfully!");

        // Call fetchProperties to refresh the list
        await fetchProperties();
      } else {
        alert(
          `Failed to delete video: ${
            response.data.message || "An error occurred"
          }`,
        );
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-7 items-center my-6 mx-1 ">
        {/* Left side: Chevron and Title */}
        <div className="flex items-center gap-1">
          <ChevronLeftIcon
            className="text-black cursor-pointer font-bold"
            style={{ width: "30px", height: "30px" }}
            onClick={handleBackClick}
          />
          <h1 className="text-2xl sm:text-1xl font-bold text-black">
            Land Details
          </h1>
        </div>

        {/* Right side: Button */}
        <Link to="/land-preview">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 sm:mt-0 flex items-center">
            <BsBuildings className="mr-2 w-5 h-5" />{" "}
            {/* Adjust the size here */}
            New Land
          </button>
        </Link>
      </div>

      <div className="relative w-full h-80 mb-6 bg-gray-200 mx-2 ">
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Title
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Property Type
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "180px" }}
                >
                  Address
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  City
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Town
                </th>

                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "160px" }}
                >
                  Price
                </th>
                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Perches
                </th>
                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Shape of Land
                </th>

                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Approach road width
                </th>

                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Map
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "180px" }}
                >
                  Description
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "200px" }}
                >
                  Images
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {landData.length > 0 ? (
                landData.map((land) => (
                  <tr key={land._id} className="border-t">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="title"
                          value={editValues.title}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.title
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="propertyType"
                          value={editValues.type}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.type
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="address"
                          value={editValues.address}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.address
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="city"
                          value={editValues.city}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.city
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="town"
                          value={editValues.town}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.town
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editValues.price}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        `Rs. ${land.price.toLocaleString()}`
                      )}
                    </td>

                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="number"
                          name="size"
                          value={editValues.perches}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.perches
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="shapeOfLand"
                          value={editValues.shapeOfLand}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.shapeOfLand
                      )}
                    </td>

                    <td className="py-4 px-2 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="number"
                          name="roadWidth"
                          value={editValues.roadWidth}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        land.roadWidth
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <input
                          type="text"
                          name="map"
                          value={editValues.map}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        <a
                          href={land.map}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Map
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <textarea
                          name="description"
                          value={editValues.description}
                          onChange={handleInputChange}
                          className="border p-1"
                          rows="2"
                        />
                      ) : (
                        land.description
                      )}
                    </td>

                    {/* Photos Column */}
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === land._id ? (
                        <div>
                          {land.photos && land.photos.length > 0 ? (
                            <ul>
                              {land.photos.map((photo) => (
                                <li
                                  key={photo._id || photo.public_id}
                                  className="my-2 flex items-center"
                                >
                                  {editPhotoId === photo._id ? (
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleFileChange(e, photo._id)
                                      }
                                      className="border p-1 mr-2"
                                    />
                                  ) : (
                                    <img
                                      src={photo.url}
                                      alt="Property photo"
                                      className="w-20 h-10 object-cover rounded mr-2"
                                    />
                                  )}
                                  <button
                                    onClick={() => handlePhotoEdit(photo._id)}
                                    className="text-blue-600 hover:text-blue-800 mx-2"
                                  >
                                    <FaPenToSquare className="text-green-600" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handlePhotoDeletes(
                                        land._id,
                                        photo.public_id,
                                      )
                                    }
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "No Images"
                          )}
                        </div>
                      ) : (
                        <div>
                          {land.photos && land.photos.length > 0 ? (
                            <ul>
                              {land.photos.map((photo) => (
                                <li
                                  key={photo._id || photo.public_id}
                                  className="my-2"
                                >
                                  <img
                                    src={photo.url}
                                    alt="Property photo"
                                    className="w-20 h-10 object-cover rounded"
                                  />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "No Images"
                          )}
                        </div>
                      )}
                    </td>

                    <td className="my-10 py-4 px-6 text-right flex items-center justify-center space-x-4">
                      {editRowId === land._id ? (
                        <button
                          onClick={handleUpdate}
                          className="px-3 py-1 my-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(land)}
                          className="px-3 py-1 my-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="px-3 py-1 my-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(land._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="py-4 px-6 text-center">
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListLands;
