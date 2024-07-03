import React, { useState, useRef } from 'react';
import axios from 'axios';

const SearchBar = ({ onResults, apiUrl }) => {
  const [query, setQuery] = useState("");
  const debounceTimeoutRef = useRef(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${apiUrl}?q=${newQuery}`);
        const fetchedResults = response.data.results.map(pkg => pkg.package.name);
        console.log('Fetched results:', fetchedResults);

        onResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 800);
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    handleSearch(newQuery);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search NPM packages..."
        className="border p-2 flex-grow"
      />
      <button onClick={() => handleSearch(query)} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;