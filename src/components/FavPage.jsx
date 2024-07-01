import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModel';

const FavPage = () => {
  const [favoriteData, setFavoriteData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteData(storedFavorites);
  }, []);

  const handleDelete = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
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

  const handleAddFav = () => {
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favoriteData.length > 0 ? (
        <div>
          {favoriteData.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{item.result}</p>
              <p>{item.reason}</p>
              <button
                onClick={() => handleDelete(index)}
                className="mt-2 p-2 bg-red-500 text-white"
              >
                Remove
              </button>
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