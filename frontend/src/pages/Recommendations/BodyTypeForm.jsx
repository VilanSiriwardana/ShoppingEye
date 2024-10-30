import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CustomPopup from '../Recommendations/Components/CustomPopup';

const BodyTypeForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [outfits, setOutfits] = useState([{ fitName: '', fitDescription: '', images: [] }]);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');
  const navigate = useNavigate();
  const { bodyTypesId } = useParams();

  useEffect(() => {
    if (bodyTypesId) {
      axios.get(`http://localhost:3050/api/bodyTypes/getBodyType/${bodyTypesId}`)
        .then(response => {
          const { name, description, imageUrl, outfits } = response.data;
          setForm({ name, description, image: null });
          setImagePreview(imageUrl);
          setOutfits(outfits.length ? outfits : [{ fitName: '', fitDescription: '', images: [] }]);
        })
        .catch(error => {
          console.error('There was an error fetching the body type!', error);
        });
    }
  }, [bodyTypesId]);

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onOutfitChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOutfits = [...outfits];
    updatedOutfits[index][name] = value;
    setOutfits(updatedOutfits);
  };

  const onOutfitImageChange = (index, e) => {
    const updatedOutfits = [...outfits];
    const files = Array.from(e.target.files);

    if (files.length + updatedOutfits[index].images.length > 3) {
      alert("You can only upload up to 3 images for each outfit.");
      return;
    }

    // Create preview URLs for the newly selected images
    const newImagesPreviews = files.map(file => URL.createObjectURL(file));
    
    // Store the actual file objects (needed for FormData) in a separate property
    const newImagesFiles = files.map(file => file);

    // Update the outfit's images with the new images while preserving existing ones
    updatedOutfits[index].images = [...updatedOutfits[index].images, ...newImagesPreviews]; // For preview
    updatedOutfits[index].imageFiles = [...(updatedOutfits[index].imageFiles || []), ...newImagesFiles]; // For files

    setOutfits(updatedOutfits);

    // Log the uploaded images
    console.log(`Outfit ${index + 1} uploaded images:`, newImagesFiles);
  };
  

  const addNewOutfit = () => {
    setOutfits([...outfits, { fitName: '', fitDescription: '', images: [] }]);
  };

  const removeOutfit = (index) => {
    const updatedOutfits = [...outfits];
    updatedOutfits.splice(index, 1);
    setOutfits(updatedOutfits);
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const url = bodyTypesId
        ? `http://localhost:3050/api/bodyTypes/updateBodyType/${bodyTypesId}`
        : 'http://localhost:3050/api/bodyTypes/addBodyType';
      const method = bodyTypesId ? 'PUT' : 'POST';

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image);
      
      // const outfitsWithoutImages = outfits.map(({ images, ...rest }) => rest);
      // formData.append('outfits', JSON.stringify(outfitsWithoutImages));

      // // Append each outfit image to FormData
      // outfits.forEach((outfit, index) => {
      //   if (outfit.images && outfit.images.length > 0) {
      //       outfit.images.forEach((image, imageIndex) => {
      //           // Assuming the image is an actual File object in your state,
      //           // otherwise you will need to handle how you get the actual file.
      //           formData.append(`outfitImages`, image); // Changed this line to append just 'outfitImages' key
      //       });
      //   }
      // });


      // // Remove the images field from outfits and store the rest of the outfit data in formData
      // const outfitsWithoutImages = outfits.map(({ images, imageFiles, ...rest }) => rest);
      // formData.append('outfits', JSON.stringify(outfitsWithoutImages));

      // // Append each outfit's actual file object to FormData under a unique key per outfit
      // outfits.forEach((outfit, index) => {
      //   if (outfit.imageFiles && outfit.imageFiles.length > 0) {
      //     outfit.imageFiles.forEach((imageFile, imageIndex) => {
      //       // Append the actual file object, not the preview URL
      //       formData.append(`outfitImages_${index}_${imageIndex}`, imageFile); 
      //     });
      //   }
      // });


      // Log formData entries
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        handleResponse('BodyType saved/updated successfully!', 'info');
      } else {
        handleError(data.message || 'Error saving/updating BodyType.');
      }
    } catch (error) {
      handleError('Error saving/updating BodyType.');
    }
  };

  const handleResponse = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setIsPopupOpen(true);
    setForm({ name: '', description: '', image: null });
    setImagePreview('');
    setOutfits([{ fitName: '', fitDescription: '', images: [] }]);
    setError('');
  };

  const handleError = (message) => {
    setPopupMessage(message);
    setPopupType('error');
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    navigate('/listBodyTypes');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">{bodyTypesId ? 'Edit Body Type' : 'Add Body Type'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body Type Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            type="text"
            name="name"
            value={form.name}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            name="description"
            value={form.description}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            type="file"
            name="image"
            onChange={onFileChange}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" />}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Outfits</label>
          {outfits.map((outfit, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Outfit {index + 1}</label>

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 mb-2"
                type="text"
                name="fitName"
                placeholder="Outfit Name"
                value={outfit.fitName}
                onChange={(e) => onOutfitChange(index, e)}
                required
              />

              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 mb-2"
                name="fitDescription"
                placeholder="Outfit Description"
                value={outfit.fitDescription}
                onChange={(e) => onOutfitChange(index, e)}
                required
              />

              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => onOutfitImageChange(index, e)}
              />
              <div className="flex flex-wrap mt-2">
                {outfit.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Outfit ${index + 1} Image ${imgIndex + 1}`}
                    className="h-20 w-20 object-cover mr-2 border border-gray-300 rounded"
                  />
                ))}
              </div>

              <button
                type="button"
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeOutfit(index)}
              >
                Remove Outfit
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={addNewOutfit}
          >
            Add Outfit
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {bodyTypesId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      {isPopupOpen && (
        <CustomPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default BodyTypeForm;
