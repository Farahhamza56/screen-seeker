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
  }, []);

  async function runSearch(term) {
    try {
      setLoading(true);
      setError("");
      setHasSearched(true);

      const data = await searchShows(term);

      setShows(data.map((item) => item.show));
    } catch {
      setShows([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

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
    if (query.trim()) {
      runSearch(query.trim());
    }
  }

  const genres = useMemo(() => {
    const genreSet = new Set();

    shows.forEach((show) => {
      show.genres?.forEach((genre) => genreSet.add(genre));
    });

    return ["All", ...Array.from(genreSet).sort()];
  }, [shows]);

  const visibleShows = useMemo(() => {
    let result = [...shows];

    if (genreFilter !== "All") {
      result = result.filter((show) =>
        show.genres?.includes(genreFilter)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          (b.rating?.average ?? 0) -
          (a.rating?.average ?? 0)
      );
    }

    return result;
  }, [shows, genreFilter, sortBy]);

  return (
    <main className="search-page">
      <section className="search-header">
        <div>
          <p className="page-eyebrow">DISCOVER</p>

          <h1 className="page-title">
            Find your next favorite show
          </h1>

          <p className="page-description">
            Search thousands of shows and discover something worth watching.
          </p>
        </div>
      </section>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search for a show..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search for a show"
          />

          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && (
        <div className="search-status">
          <div className="loading-spinner" />
          <p>Searching for shows...</p>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p>{error}</p>

          <button onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && hasSearched && shows.length === 0 && (
        <div className="search-empty">
          <div className="empty-search-icon">⌕</div>

          <h2>No shows found</h2>

          <p>
            We couldn't find anything matching "{query}".
            Try searching for another title.
          </p>
        </div>
      )}

      {!loading && !error && shows.length > 0 && (
        <>
          <div className="search-results-header">
            <div>
              <p className="results-label">SEARCH RESULTS</p>

              <h2>
                {visibleShows.length}{" "}
                {visibleShows.length === 1 ? "show" : "shows"}
              </h2>
            </div>

            <div className="search-controls">
              <div className="filter-group">
                <label htmlFor="genre-filter">
                  Genre
                </label>

                <div className="select-wrapper">
                  <select
                    id="genre-filter"
                    value={genreFilter}
                    onChange={(event) =>
                      setGenreFilter(event.target.value)
                    }
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-by">
                  Sort by
                </label>

                <div className="select-wrapper">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                  >
                    <option value="relevance">
                      Relevance
                    </option>

                    <option value="rating">
                      Rating: High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {visibleShows.length > 0 ? (
            <div className="movies-grid">
              {visibleShows.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                />
              ))}
            </div>
          ) : (
            <div className="search-empty compact">
              <h2>No shows match this filter</h2>

              <p>
                Try selecting another genre or changing the
                sorting options.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Search;