import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";


function MovieCard({ show }) {
  const poster =
    show.image?.medium ||
    "https://via.placeholder.com/210x295?text=No+Image";

  const genres = show.genres?.length
    ? show.genres.join(", ")
    : "Unknown";

  const rating = show.rating?.average ?? "N/A";

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(show.id);

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    saved ? removeFromWatchlist(show.id) : addToWatchlist(show);
  };



  return (
    <Link to={`/details/${show.id}`} className="movie-card">
      <img src={poster} alt={show.name} />
      <h3>{show.name}</h3>
      <p>⭐ {rating}</p>
      <p>{genres}</p>
      <button
        onClick={handleWatchlistClick}
        className={`watchlist-btn ${saved ? "saved" : ""}`}
      >
        {saved ? "✓ Saved" : "+ Watchlist"}
      </button>
    </Link>
  );
}

export default MovieCard;