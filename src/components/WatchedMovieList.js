import React from "react";

function WatchedMovieList({ watched, onClose }) {
  return (
    <ul className="list list-movies">
      {watched?.map((movie) => (
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
              <span>{movie.Runtime} min</span>
            </p>
          </div>
          <button className="btn-delete" onClick={() => onClose(movie.imdbID)}>
            {" "}
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMovieList;
