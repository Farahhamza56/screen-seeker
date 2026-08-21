import { NavLink, Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Navbar({ theme, toggleTheme }) {
  const { watchlist } = useWatchlist();

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">🎬</span>

          <span className="brand-text">
            <span className="brand-name">ScreenSeeker</span>
            <span className="brand-tagline">Find your next story</span>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>⌂</span>
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>⌕</span>
            Search
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span>♡</span>
            Watchlist

            {watchlist.length > 0 && (
              <span className="nav-badge">{watchlist.length}</span>
            )}
          </NavLink>

          <button
            className="nav-link theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;