import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>🎬 ScreenSeeker</h2>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/watchlist">Watchlist</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;