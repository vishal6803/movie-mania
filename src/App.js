import { useEffect, useState } from "react";
import {
  Box,
  Loader,
  Logo,
  Main,
  MovieList,
  Navbar,
  MovieDetails,
  WatchedMovieList,
  Search,
  WatchedSummery,
  NumResults,
} from "./components";
const KEY = "ede561ab";

export default function App() {
  const [query, setQuery] = useState("test");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);
  const [details, setDetails] = useState(null);

  function handleSelectMovie(id) {
    setSelectMovie((prev) => (prev === id ? null : id));
  }
  useEffect(() => {
    fetchByID();
    // console.log(details);
  }, selectMovie);

  async function fetchByID() {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${selectMovie}&apikey=${KEY}`
      );
      const jsonRes = await res.json();
      if (jsonRes) {
        setDetails(jsonRes);
      } else {
        setDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      if (query.length < 2) {
        setLoading(false);
      }
      const res = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`
      );
      if (!res.ok) {
        throw new Error("Faiiled to Fetch");
      }
      const jsonRes = await res.json();
      if (jsonRes.Search) {
        setLoading(false);
        setMovies(jsonRes.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading ? (
            <Loader />
          ) : (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <p className="error"> {error}</p>}
        </Box>
        <Box>
          {/* {selectMovie && } */}
          {selectMovie ? (
            <MovieDetails selectMovie={selectMovie} details={details} />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList watched={watched} selectMovie={selectMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
