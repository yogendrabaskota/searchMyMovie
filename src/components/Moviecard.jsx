import React from 'react';

const MovieCard = ({ movie, showAddButton = true, showRemoveButton = false, onRemove }) => {
  const handleAddToFav = () => {
    const storedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    const isAlreadyFav = storedFavs.some((fav) => fav.imdbID === movie.imdbID);
    if (!isAlreadyFav) {
      const updatedFavs = [...storedFavs, movie];
      localStorage.setItem('favourites', JSON.stringify(updatedFavs));
      alert(`${movie.Title} added to favourites!`);
    } else {
      alert('Movie already in favourites!');
    }
  };

  const handleRemoveFromFav = () => {
    const storedFavs = JSON.parse(localStorage.getItem('favourites')) || [];
    const updatedFavs = storedFavs.filter((fav) => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
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
        {showAddButton && (
          <button
            onClick={handleAddToFav}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Fav
          </button>
        )}
        {showRemoveButton && (
          <button
            onClick={handleRemoveFromFav}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
