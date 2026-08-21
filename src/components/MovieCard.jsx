import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function MovieCard({ show }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  const poster =
    show.image?.original ||
    show.image?.medium ||
    "https://via.placeholder.com/600x900?text=No+Image";

  const rating = show.rating?.average ?? "N/A";

  const genres = show.genres?.length
    ? show.genres.slice(0, 3)
    : [];

  const saved = isInWatchlist(show.id);

  function handleWatchlistClick() {
    if (saved) {
      removeFromWatchlist(show.id);
    } else {
      addToWatchlist(show);
    }
  }

  return (
    <article className="movie-card">
      <Link
        to={`/details/${show.id}`}
        className="movie-card-link"
        aria-label={`View details for ${show.name}`}
      >
        <div className="movie-poster-wrapper">
          <img
            src={poster}
            alt={show.name}
            className="movie-poster"
            loading="lazy"
          />

          <div className="movie-poster-overlay" />

          <div className="rating-badge">
            <span>★</span>
            {rating}
          </div>

          <div className="view-details">
            View Details
          </div>
        </div>

        <div className="movie-card-content">
          <h3 className="movie-title">{show.name}</h3>

          {genres.length > 0 && (
            <div className="genre-list">
              {genres.map((genre) => (
                <span key={genre} className="genre-chip">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="movie-card-footer">
        <button
          type="button"
          onClick={handleWatchlistClick}
          className={`watchlist-btn ${saved ? "saved" : ""}`}
          aria-label={
            saved
              ? `Remove ${show.name} from watchlist`
              : `Add ${show.name} to watchlist`
          }
          aria-pressed={saved}
        >
          <span>{saved ? "✓" : "+"}</span>
          {saved ? "Saved" : "Watchlist"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;