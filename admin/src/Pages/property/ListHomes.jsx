import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { TbHomePlus } from "react-icons/tb";
import { Link } from "react-router-dom";

const ListHomes = ({ property }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [houseData, setHouseData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editVideoId, setEditVideoId] = useState(null);

  const handlePhotoEdit = (photoId) => {
    setEditPhotoId(photoId); 
  };

  //get all house properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/property/");

      const filteredData = response.data.data.filter(
        (house) => house.type === "house",
      );

      setHouseData(filteredData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEditClick = (house) => {
    setEditRowId(house._id);
    setEditValues(house);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo 
  const handleFileChange = (e, photoId) => {
    const newFile = e.target.files[0];
    console.log(`Selected file for photoId ${photoId}:`, newFile);

    const updatedPhotos = editValues.photos.map((photo) =>
      photo._id === photoId
        ? { ...photo, file: newFile } 
        : photo,
    );

    setEditValues((prev) => ({
      ...prev,
      photos: updatedPhotos,
    }));
  };


  const handleVideoChange = (e, videoId) => {
    const newFile = e.target.files[0];
    console.log(`Selected file for videoId ${videoId}:`, newFile);

    const updatedVideos = editValues.videos.map((video) =>
      video._id === videoId ? { ...video, file: newFile } : video,
    );

    setEditValues((prev) => ({
      ...prev,
      videos: updatedVideos,
    }));
  };


  const handleVideoEdit = (videoId) => {
    setEditVideoId(videoId); 
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
           `http://localhost:5000/api/property/replace/${editRowId}/photos/${photo.public_id}`,
           replaceFormData,
           { headers: { "Content-Type": "multipart/form-data" } },
         );
       });

     editValues.videos.forEach((video) => {
       formData.append("videos", video);
     });

     const updateResponse = await axios.put(
       `http://localhost:5000/api/property/update/${editRowId}`,
       formData,
       { headers: { "Content-Type": "multipart/form-data" } },
     );

     console.log("Primary update response:", updateResponse);

     const replacePhotoResponses = await Promise.all(replacePhotoPromises);
     console.log("Photo replacement responses:", replacePhotoResponses);

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
        `http://localhost:5000/api/property/delete/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert("Property deleted successfully!");
        fetchProperties(); 
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
        `http://localhost:5000/api/property/remove/${propertyId}/photos/${photoPublicId}`,
      );

      console.log("API response:", response); 

      if (response.status === 200) {
        alert("Photo deleted successfully!");

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
        `http://localhost:5000/api/property/remove/${propertyId}/videos/${videoPublicId}`,
      );

      console.log("API response:", response); 

      if (response.status === 200) {
        alert("Video deleted successfully!");

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
            Home Details
          </h1>
        </div>

        {/* Right side: Button */}
        <Link to="/home-preview">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 sm:mt-0 flex items-center">
            <TbHomePlus className="mr-2 w-5 h-5" /> {/* Adjust the size here */}
            New House
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
                  City
                </th>
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
                  Title Description
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
                  Square Feet
                </th>
                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Bedrooms
                </th>
                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Bathrooms
                </th>
                <th
                  className="py-3 px-2 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Parking
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Agent
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
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                >
                  Videos
                </th>
                <th
                  className="py-3 px-6 bg-gray-200 border-r border-gray-300"
                  style={{ minWidth: "120px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {houseData.length > 0 ? (
                houseData.map((house) => (
                  <tr key={house._id} className="border-t">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="city"
                          value={editValues.city}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.city
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="title"
                          value={editValues.title}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.title
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="titleDescription"
                          value={editValues.titleDescription}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.titleDescription
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editValues.price}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        `Rs. ${house.price.toLocaleString()}`
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="number"
                          name="squareFeet"
                          value={editValues.squareFeet}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        `${house.squareFeet} sq ft`
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="number"
                          name="bedrooms"
                          value={editValues.bedrooms}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.bedrooms
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="number"
                          name="bathrooms"
                          value={editValues.bathrooms}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.bathrooms
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="parking"
                          value={editValues.parking}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.parking
                      )}
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="agent"
                          value={editValues.agent}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        house.agent
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <input
                          type="text"
                          name="map"
                          value={editValues.map}
                          onChange={handleInputChange}
                          className="border p-1"
                        />
                      ) : (
                        <a
                          href={house.map}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Map
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <textarea
                          name="description"
                          value={editValues.description}
                          onChange={handleInputChange}
                          className="border p-1"
                          rows="2"
                        />
                      ) : (
                        house.description
                      )}
                    </td>

                    {/* Photos Column */}
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <div>
                          {house.photos && house.photos.length > 0 ? (
                            <ul>
                              {house.photos.map((photo) => (
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
                                        house._id,
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
                          {house.photos && house.photos.length > 0 ? (
                            <ul>
                              {house.photos.map((photo) => (
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

                    {/* Videos Column */}
                    <td className="py-4 px-6 text-sm text-gray-700 border-r border-gray-300">
                      {editRowId === house._id ? (
                        <div>
                          {house.videos && house.videos.length > 0 ? (
                            <ul>
                              {house.videos.map((video) => (
                                <li
                                  key={video._id}
                                  className="my-2 flex items-center"
                                >
                                  {editVideoId === video._id ? (
                                    <input
                                      type="file"
                                      accept="video/*"
                                      className="border p-1 mr-2"
                                      onChange={(e) =>
                                        handleFileChange(e, null, video._id)
                                      }
                                    />
                                  ) : (
                                    <a
                                      href={video.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline mr-2"
                                    >
                                      View Video
                                    </a>
                                  )}

                                  <button
                                    onClick={() => handleVideoEdit(video._id)}
                                    className="text-blue-600 hover:text-blue-800 mx-2"
                                  >
                                    <FaPenToSquare className="text-green-600" />
                                  </button>

                                  {/* Delete button to remove this video */}
                                  <button
                                    onClick={() =>
                                      handleVideoDeletes(
                                        house._id,
                                        video.public_id,
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
                            "No Videos"
                          )}
                        </div>
                      ) : (
                        <div>
                          {house.videos && house.videos.length > 0 ? (
                            <ul>
                              {house.videos.map((video) => (
                                <li key={video._id} className="my-2">
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    View Video
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "No Videos"
                          )}
                        </div>
                      )}
                    </td>

                    <td className="my-10 py-4 px-6 text-right flex items-center justify-center space-x-4">
                      {editRowId === house._id ? (
                        <button
                          onClick={handleUpdate}
                          className="px-3 py-1 my-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(house)}
                          className="px-3 py-1 my-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="px-3 py-1 my-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(house._id)}
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

export default ListHomes;
