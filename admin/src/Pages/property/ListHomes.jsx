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
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);  // State to store selected image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const db = getFirestore(getApp());  // Initialize Firestore
  const storage = getStorage(getApp()); // Initialize Firebase Storage

  // Handle image upload to Firebase Storage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));  // Preview the image locally (optional)
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !price || !bedrooms || !bathrooms || !imageFile) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Step 1: Upload the image to Firebase Storage
      const storageRef = ref(storage, `homes/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

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

          // Step 3: Add the home data to Firestore with the image URL
          await addDoc(collection(db, 'homes'), {
            address,
            price,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            imageUrl: downloadURL,  // Store the image URL from Firebase Storage
            createdAt: new Date(),
          });

          setSuccessMessage('House listed successfully!');
          setAddress('');
          setPrice('');
          setBedrooms('');
          setBathrooms('');
          setImageFile(null);
          setImageUrl('');
        }
      );
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

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          {imageUrl && <img src={imageUrl} alt="Image preview" className="w-full h-40 object-cover rounded-md mt-2" />}
        </div>

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
