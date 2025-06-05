import React, { useEffect, useState } from 'react';

const MovieCard = ({ movie, onRemove }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    const alreadyFav = storedFavs.some((fav) => fav.imdbID === movie.imdbID);
    setIsFav(alreadyFav);
  }, [movie.imdbID]);

  const handleAddToFav = () => {
    const storedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!storedFavs.some((fav) => fav.imdbID === movie.imdbID)) {
      const updatedFavs = [...storedFavs, movie];
      localStorage.setItem('favourites', JSON.stringify(updatedFavs));
      setIsFav(true);
      alert(`${movie.Title} added to favourites!`);
    }
  };

  const handleRemoveFromFav = () => {
    const storedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    const updatedFavs = storedFavs.filter((fav) => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
    setIsFav(false);
    if (onRemove) onRemove(movie.imdbID);
  };

  return (
    <div className="flex items-center justify-between space-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
      <div
        onClick={() => (window.location.href = `/movie/${movie.imdbID}`)}
        className="flex items-center space-x-4 cursor-pointer"
      >
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=No+Image'}
          alt={movie.Title}
          className="w-16 h-24 object-cover rounded"
        />
        <div>
          <p className="text-lg font-medium dark:text-white">{movie.Title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{movie.Year}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {isFav ? (
          <button
            onClick={handleRemoveFromFav}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove from Fav
          </button>
        ) : (
          <button
            onClick={handleAddToFav}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Fav
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
