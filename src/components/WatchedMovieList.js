import React from "react";

function WatchedMovieList({ watched }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <li key={movie.imdbID} className="">
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMovieList;
