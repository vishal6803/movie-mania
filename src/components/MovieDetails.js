import { useEffect, useState } from "react";
import Loader from "./Loader";
import Rating from "./Rating";
const KEY = "ede561ab";

function MovieDetails({ onCloseMovie, selectMovie, onAddWatched, watched }) {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectMovie);
  const givenRating = watched?.find(
    (movie) => movie.imdbID === selectMovie
  )?.userRating;
  console.log(givenRating);

  const {
    Title,
    Poster,
    Released,
    Genre,
    imdbRating,
    Actors,
    Director,
    Plot,
    Runtime,
    imdbID,
  } = details;

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;
    return function () {
      document.title = "Movie-Mania";
    };
  }, [Title]);

  useEffect(() => {
    async function fetchByID() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectMovie}&apikey=${KEY}`
        );
        if (!res.ok) throw new Error("Somthing Went Wrong");
        const jsonRes = await res.json();
        if (jsonRes) {
          setDetails(jsonRes);
          setLoading(false);
        } else {
          setDetails(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchByID();
  }, [selectMovie]);
  console.log(details);
  function handleWatchList() {
    const newMovie = {
      imdbID,
      Title,
      userRating,
      Actors,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
    };
    onAddWatched(newMovie);
  }

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <button className="btn-back" onClick={() => onCloseMovie()}>
            &larr;
          </button>
          <header>
            <img src={Poster} alt={`${Title} Poster`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released}. {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Rating maxRating={10} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleWatchList}>
                      +Add To WatchList
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  Yoy Rated This Movie {givenRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Staring : {Actors}</p>
            <p>Director: {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
