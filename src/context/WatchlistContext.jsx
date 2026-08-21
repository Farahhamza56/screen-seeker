import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch {
      // Ignore storage errors.
    }
  }, [watchlist]);

  function addToWatchlist(show) {
    setWatchlist((current) => {
      const alreadyExists = current.some(
        (savedShow) => savedShow.id === show.id
      );

      if (alreadyExists) {
        return current;
      }

      return [...current, show];
    });
  }

  function removeFromWatchlist(showId) {
    setWatchlist((current) =>
      current.filter((show) => show.id !== showId)
    );
  }

  function isInWatchlist(showId) {
    return watchlist.some((show) => show.id === showId);
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used inside a WatchlistProvider"
    );
  }

  return context;
}