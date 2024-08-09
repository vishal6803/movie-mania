import { useEffect, useState } from "react";
const KEY = "ede561ab";

export default function useMovies(query, callback) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const controller = new AbortController();

  useEffect(() => {
    callback?.();
    async function fetchData() {
      try {
        setLoading(true);
        if (query.length < 2) {
          setLoading(false);
        }
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
          { signal: controller.signal }
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
        if (error === "AbortError") setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return function () {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return { movies, loading, error };
}
