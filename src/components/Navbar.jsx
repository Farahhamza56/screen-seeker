import { NavLink } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Navbar() {

  const { watchlist } = useWatchlist();
  return (
    <nav>
      <h2>🎬 ScreenSeeker</h2>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
         <NavLink to="/watchlist">
          Watchlist
          {/* Badge only appears when there's at least 1 saved show */}
          {watchlist.length > 0 && (
            <span className="badge">{watchlist.length}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;