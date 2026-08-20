import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

    const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (show) => {
    const alreadyExists = watchlist.some((s) => s.id === show.id);
    if (!alreadyExists) {
      setWatchlist((prev) => [...prev, show]);
    }
  };

  const removeFromWatchlist = (showId) => {
    setWatchlist((prev) => prev.filter((s) => s.id !== showId));
  };


  const isInWatchlist = (showId) => {
    return watchlist.some((s) => s.id === showId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}


export function useWatchlist() {
  return useContext(WatchlistContext);
}