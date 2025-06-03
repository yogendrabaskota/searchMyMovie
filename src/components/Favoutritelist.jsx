import React, { useEffect, useState } from 'react';
import MovieCard from './Moviecard';

const Favourites = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavs(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = favs.filter((movie) => movie.imdbID !== id);
    setFavs(updated); 
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Favourite Movies</h2>
      {favs.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <ul className="space-y-4">
          {favs.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              showAddButton={false}
              showRemoveButton={true}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
