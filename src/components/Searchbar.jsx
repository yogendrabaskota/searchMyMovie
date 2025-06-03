/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './Moviecard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');




  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);
 

    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          apiKey : import.meta.env.VITE_OMDB_API_KEY,
          s: query
        }
      });

      if (response.data.Response === 'True') {
        setResults(response.data.Search);
      } else {
        setError(response.data.Error || 'No results found.');
      }
    } catch (err) {
      setError('Error fetching data from OMDb.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (movie) => {
    console.log('Clicked movie:', movie);
  };

  return (
    <div className="p-4 bg-white dark:bg-white-800">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <ul className="mt-4 space-y-4">
        {results.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard movie={movie} onClick={handleCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
