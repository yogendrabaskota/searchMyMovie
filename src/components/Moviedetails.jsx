/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get('https://www.omdbapi.com/', {
          params: {
            apikey: '846c588d',
            i: id,
            plot: 'full'
          }
        });

        if (response.data.Response === 'True') {
          setMovie(response.data);
        } else {
          setError(response.data.Error || 'Movie not found.');
        }
      } catch (err) {
        setError('Error fetching movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
      <div className="flex flex-col md:flex-row items-start md:space-x-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
          className="w-64 h-auto rounded-lg"
        />
        <div className="mt-4 md:mt-0">
          {console.log(movie)}
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}(Total votes:{movie.imdbVotes})</p>
          <p><strong>Box Office earning:</strong> {movie.BoxOffice}</p>
         
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
