import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    setWatchlist((prevList) => {
      const exists = prevList.find((item) => item.id === movie.id);
      if (exists) return prevList; 
      return [...prevList, movie];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prevList) => prevList.filter((movie) => movie.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
