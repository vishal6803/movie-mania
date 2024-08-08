import { useEffect, useState } from "react";
import Loader from "./Loader";
const KEY = "ede561ab";

function MovieDetails({ onCloseMovie, selectMovie }) {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const { Title, Poster, Released, Genre, imdbRating, Actors, Director, Plot } =
    details;
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
  }, []);
  console.log(details);

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
              <p>{Released}</p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
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
