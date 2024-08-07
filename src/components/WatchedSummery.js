import React from "react";

export default function WatchedSummery({ watched }) {
  const average = (arr) =>
    arr?.reduce((acc, cur, i, arr) => acc + cur / arr?.length, 0);
  const avgImdbdRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.Runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{Math.abs(watched?.length)} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbdRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
