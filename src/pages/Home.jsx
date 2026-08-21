import { useState, useEffect } from "react";
import { getShows } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShows(1, false);
  }, []);

  function fetchShows(pageNumber, append) {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);

    getShows(pageNumber)
      .then((data) => {
        setShows((prev) => (append ? [...prev, ...data] : data));
        setPage(pageNumber);
      })
      .catch(() => setError("حصلت مشكلة في تحميل البيانات."))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }

  function handleLoadMore() {
    fetchShows(page + 1, true);
  }

  if (loading) return <p className="loading-text">Loading...</p>;

  if (error) {
    return (
      <div className="error-box">
        <p>{error}</p>
        <button onClick={() => fetchShows(1, false)}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="movies-grid">
        {shows.map((show) => (
          <MovieCard key={show.id} show={show} />
        ))}
      </div>

      <div className="load-more-wrapper">
        <button
          className="secondary-button load-more-btn"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Home;