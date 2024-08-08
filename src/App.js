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
  ErrorMessage,
} from "./components";
const KEY = "ede561ab";
// new comment by Me
export default function App() {
  const [query, setQuery] = useState("test");
  const [movies, setMovies] = useState(null);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);

  function handleSelectMovie(id) {
    setSelectMovie((prev) => (prev === id ? null : id));
  }
  function handleCloseBtn() {
    setSelectMovie(null);
  }

  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
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
        setLoading(false);
      } else {
        setMovies([]);
        if (jsonRes.Response === "False") throw new Error(jsonRes.Error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {!loading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {/* {selectMovie && } */}
          {selectMovie ? (
            <MovieDetails
              onAddWatched={handleWatched}
              selectMovie={selectMovie}
              onCloseMovie={handleCloseBtn}
              key={selectMovie}
            />
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
