import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase'; 

const ListHomes = () => {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [rooms, setRooms] = useState('');
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [perches, setPerches] = useState('');
  const [description, setDescription] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  
  const [imageFiles, setImageFiles] = useState([]); // For storing multiple images
  const [imageUrls, setImageUrls] = useState([]);  // For storing image URLs after upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const db = getFirestore(getApp());  // Initialize Firestore
  const storage = getStorage(getApp()); // Initialize Firebase Storage

  // Handle image upload to Firebase Storage
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !price || !bedrooms || !bathrooms || !rooms || !perches || !description || !town || !city || !propertyType || imageFiles.length === 0) {
      setError('Please fill in all fields and upload at least one image.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Step 1: Upload the images to Firebase Storage
      const imageUrlsTemp = [];
      for (const file of imageFiles) {
        const storageRef = ref(storage, `homes/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optionally track upload progress here
          },
          (err) => {
            setError('Image upload failed. Please try again later.');
            setLoading(false);
          },
          async () => {
            // Step 2: Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrlsTemp.push(downloadURL);
            if (imageUrlsTemp.length === imageFiles.length) {
              // After all images are uploaded, proceed to add the home data
              await addDoc(collection(db, 'homes'), {
                address,
                price,
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                rooms: Number(rooms),
                parkingAvailable,
                perches: Number(perches),
                description,
                town,
                city,
                propertyType,
                imageUrls: imageUrlsTemp,  // Store the image URLs from Firebase Storage
                createdAt: new Date(),
              });

              setSuccessMessage('House listed successfully!');
              setAddress('');
              setPrice('');
              setBedrooms('');
              setBathrooms('');
              setRooms('');
              setParkingAvailable(false);
              setPerches('');
              setDescription('');
              setTown('');
              setCity('');
              setPropertyType('house');
              setImageFiles([]);
              setImageUrls([]);
            }
          }
        );
      }
    } catch (err) {
      setError('Failed to list the home. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">List a New Home</h2>

      {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
      {successMessage && <div className="bg-green-500 text-white p-3 mb-4 rounded">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bedrooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bathrooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Number of Rooms */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Rooms</label>
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parking Availability */}
        <div className="form-group flex items-center">
          <input
            type="checkbox"
            checked={parkingAvailable}
            onChange={() => setParkingAvailable(!parkingAvailable)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Parking Available</label>
        </div>

        {/* Perches */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Perches</label>
          <input
            type="number"
            value={perches}
            onChange={(e) => setPerches(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Town */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Town</label>
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Type */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Images (Select 5 or more)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Previews */}
        <div className="form-group">
          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Image preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Listing...' : 'List Home'}
        </button>
      </form>
    </div>
  );
};

export default ListHomes;
