import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState("");
  const [reason, setReason] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedResults = localStorage.getItem('results');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    try {
      const response = await axios.get(`https://api.npms.io/v2/search?q=${searchQuery}`);
      const fetchedResults = response.data.results
        .filter(pkg => pkg.package.name.includes(searchQuery))
        .map(pkg => pkg.package.name);
      console.log('Fetched results:', fetchedResults);

      setResults(fetchedResults);
      localStorage.setItem('results', JSON.stringify(fetchedResults));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResultSelect = (event) => {
    setSelectedResult(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSaveFavorite = () => {
    if (selectedResult && reason) {
      const newFavorite = { result: selectedResult, reason };
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const updatedFavorites = [...storedFavorites, newFavorite];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSelectedResult("");
      setReason("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Search App</h1>
      <SearchBar onSearch={handleSearch} />
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
          >
            Save Favorite
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;