import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { setFav, getFav } from '../Handeler/StorageHandeler';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState("");
  const [reason, setReason] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const apiUrl = 'https://api.npms.io/v2/search';

  useEffect(() => {
    const storedFavorites = getFav();
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const handleResultSelect = (event) => {
    setSelectedResult(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSaveFavorite = () => {
    if (selectedResult && reason) {
      const isAlreadyFavorite = favorites.some(fav => fav.result === selectedResult);
      if (!isAlreadyFavorite) {
        const newFavorite = { result: selectedResult, reason };
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        setFav(updatedFavorites);
        setSelectedResult("");
        setReason("");
        setMessage("");
        setSuccessMessage(`${selectedResult} has been added to your favorites!`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setMessage(`${selectedResult} is already in your favorites list.`);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search for NPM Package</h1>
      <SearchBar onResults={setResults} apiUrl={apiUrl} />
      <div className="mt-4 border p-4 w-full max-w-md h-48 overflow-y-auto">
        {results.map((result, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="result"
                value={result}
                checked={selectedResult === result}
                onChange={handleResultSelect}
                className="mr-2"
              />
              {result}
            </label>
          </div>
        ))}
      </div>
      {selectedResult && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Why is this your fav?</h2>
          <textarea
            value={reason}
            onChange={handleReasonChange}
            placeholder="Enter your reason here..."
            className="border p-2 w-full"
          />
          <button
            onClick={handleSaveFavorite}
            className="mt-2 p-2 bg-blue-500 text-white"
            disabled={message !== ""}
          >
            Save Favorite
          </button>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
      )}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default HomePage;