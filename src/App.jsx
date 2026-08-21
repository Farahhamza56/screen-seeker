import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Watchlist from "./pages/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";

function NotFound() {
  return (
    <section className="state-page">
      <div className="state-content">
        <span className="state-icon">404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <a href="/" className="primary-button">
          Back to Home
        </a>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <WatchlistProvider>
      <div className="app">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </WatchlistProvider>
  );
}

export default App;