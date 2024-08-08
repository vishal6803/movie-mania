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
  WatchedSummery,
  NumResults,
  Search,
} from "./components";
const KEY = "ede561ab";
// new comment by Me
export default function App() {
  const [query, setQuery] = useState("test");
  const [movies, setMovies] = useState();
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
    }
  }
  useEffect(() => {
    fetchData();
  }, [query]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>{loading && <MovieList movies={movies} />}</Box>
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
