import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { searchShows } from "../services/api";
import MovieCard from "../components/MovieCard";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runSearch(term) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const data = await searchShows(term);
      setShows(data.map((item) => item.show));
    } catch (err) {
      setShows([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    const term = query.trim();

    if (!term) {
      setShows([]);
      setError("");
      setHasSearched(false);
      setSearchParams({});
      return;
    }

    setSearchParams({ q: term });
    runSearch(term);
  }

  function handleRetry() {
    if (query.trim()) runSearch(query.trim());
  }

  const genres = useMemo(() => {
    const set = new Set();
    shows.forEach((show) => show.genres?.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort()];
  }, [shows]);

  const visibleShows = useMemo(() => {
    let result = shows;

    if (genreFilter !== "All") {
      result = result.filter((show) => show.genres?.includes(genreFilter));
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)
      );
    }

    return result;
  }, [shows, genreFilter, sortBy]);

  return (
    <main className="search-page">
      <h1>Search Shows</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading-text">Loading...</p>}

      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={handleRetry}>Try Again</button>
        </div>
      )}

      {!loading && !error && hasSearched && shows.length === 0 && (
        <p className="no-results">
          No titles found matching your search
        </p>
      )}

      {!loading && !error && shows.length > 0 && (
        <div className="search-controls">
          <div className="filter-group">
            <label htmlFor="genre-filter">Genre</label>
            <select
              id="genre-filter"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort by</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>
        </div>
      )}

      {!loading && visibleShows.length > 0 && (
        <div className="movies-grid">
          {visibleShows.map((show) => (
            <MovieCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Search;