import { Link } from "react-router-dom";

function MovieCard({ show }) {
  const poster =
    show.image?.medium ||
    "https://via.placeholder.com/210x295?text=No+Image";

  const genres = show.genres?.length
    ? show.genres.join(", ")
    : "Unknown";

  const rating = show.rating?.average ?? "N/A";

  return (
    <Link to={`/details/${show.id}`} className="movie-card">
      <img src={poster} alt={show.name} />
      <h3>{show.name}</h3>
      <p>⭐ {rating}</p>
      <p>{genres}</p>
    </Link>
  );
}

export default MovieCard;