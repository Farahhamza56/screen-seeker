import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist } = useWatchlist();

  // Empty state — user hasn't saved anything yet
  if (watchlist.length === 0) {
    return (
      <div className="empty-watchlist">
        <h2>Your Watchlist is Empty 🍿</h2>
        <p>Go explore some shows and hit "+ Watchlist" to save them here.</p>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <h1>My Watchlist ({watchlist.length})</h1>

      
      <div className="movies-grid">
        {watchlist.map((show) => (
          <MovieCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;