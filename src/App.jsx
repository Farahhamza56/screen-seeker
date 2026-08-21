import './App.css'  
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Watchlist from "./pages/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
  return (
    <WatchlistProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </WatchlistProvider>
  );
}

export default App;
