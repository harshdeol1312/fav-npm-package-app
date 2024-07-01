import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModel';
import axios from 'axios';

const FavPage = () => {
  const [favoriteData, setFavoriteData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [viewIndex, setViewIndex] = useState(null);
  const [editedResult, setEditedResult] = useState('');
  const [editedReason, setEditedReason] = useState('');
  const [packageDetails, setPackageDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteData(storedFavorites);
  }, []);

  const handleDelete = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const handleEdit = (index, result, reason) => {
    setEditIndex(index);
    setEditedResult(result);
    setEditedReason(reason);
  };

  const handleView = async (index, result) => {
    setViewIndex(index);
    setPackageDetails(null);
    setErrorMessage('');
    try {
      const response = await axios.get(`https://api.npms.io/v2/package/${result}`);
      console.log('Package details:', response.data.collected);
      setPackageDetails(response.data.collected.metadata);
    } catch (error) {
      console.error('Error fetching package details:', error);
      setErrorMessage('No additional details to display.');
    }
  };

  const confirmDelete = () => {
    const updatedFavorites = favoriteData.filter((_, index) => index !== deleteIndex);
    setFavoriteData(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setShowModal(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteIndex(null);
  };

  const saveEdit = () => {
    const updatedFavorites = [...favoriteData];
    updatedFavorites[editIndex] = { result: editedResult, reason: editedReason };
    setFavoriteData(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setEditIndex(null);
    setEditedResult('');
    setEditedReason('');
    setViewIndex(null);
    setPackageDetails(null);
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedResult('');
    setEditedReason('');
    setViewIndex(null);
    setPackageDetails(null);
    setErrorMessage('');
  };

  const handleAddFav = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favoriteData.length > 0 ? (
        <div>
          {favoriteData.map((item, index) => (
            <div key={index} className="mb-4 border p-4">
              {editIndex === index ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedResult}
                    onChange={(e) => setEditedResult(e.target.value)}
                    className="border p-2 flex-grow mr-2"
                  />
                  <textarea
                    value={editedReason}
                    onChange={(e) => setEditedReason(e.target.value)}
                    className="border p-2 flex-grow mr-2"
                  />
                  <div>
                    <button
                      onClick={saveEdit}
                      className="mr-2 p-2 bg-blue-500 text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 bg-gray-500 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{item.result}</p>
                    <p>{item.reason}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleView(index, item.result)}
                      className="mr-2 p-2 bg-green-500 text-white"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(index, item.result, item.reason)}
                      className="mr-2 p-2 bg-yellow-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 bg-red-500 text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              {viewIndex === index && packageDetails && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{packageDetails.name}</h3>
                  <p>{packageDetails.description}</p>
                  <p>Version: {packageDetails.version}</p>
                  <p>Dependencies:</p>
                  <ul>
                    {Object.keys(packageDetails.dependencies || {}).map((dep) => (
                      <li key={dep}>{dep}</li>
                    ))}
                  </ul>
                  <button
                    onClick={cancelEdit}
                    className="mt-2 p-2 bg-gray-500 text-white"
                  >
                    Close
                  </button>
                </div>
              )}
              {viewIndex === index && errorMessage && (
                <div className="mt-4 text-red-500">{errorMessage}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p>No favorites saved yet.</p>
          <div>
            <button
              onClick={handleAddFav}
              className="mt-4 p-2 bg-blue-500 text-white"
            >
              Add Fav
            </button>
          </div>
        </>
      )}
      {showModal && (
        <ConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </div>
  );
};

export default FavPage;