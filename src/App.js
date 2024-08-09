import { useState } from "react";
import { useMovies, useLocalStorage, useKey } from "./hooks";
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

export default function App() {
  const [query, setQuery] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const { movies, error, loading } = useMovies(query, handleCloseBtn);
  function handleSelectMovie(id) {
    setSelectMovie((prev) => (prev === id ? null : id));
  }
  function handleCloseBtn() {
    setSelectMovie(null);
  }

  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleClose(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useKey("Escape", handleSelectMovie);

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
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                selectMovie={selectMovie}
                onClose={handleClose}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
