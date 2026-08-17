import { useState, useEffect } from "react";
import { getShows } from "../services/api";
import MovieCard from "../components/MovieCard";

function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShows();
  }, []);

  function fetchShows() {
    setLoading(true);
    setError(null);
    getShows(1)
      .then((data) => setShows(data))
      .catch(() => setError("حصلت مشكلة في تحميل البيانات."))
      .finally(() => setLoading(false));
  }

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchShows}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} />
      ))}
    </div>
  );
}

export default Home;