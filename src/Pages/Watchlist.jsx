import React, { useEffect, useState } from "react";
import { auth, getWatchlist, removeFromWatchlist } from "../firebase";  
import { onAuthStateChanged } from "firebase/auth";
import "./Watchlist.css";
import { toast } from "react-toastify";

function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getWatchlist(user.uid);
        setMovies(data);
      } else {
        setMovies([]);
      }
      setLoading(false);
    });

     return () => unsubscribe();
  }, []);

   const handleRemove = async (movieId) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to modify your watchlist!");
      return;
    }
    try {
      await removeFromWatchlist(user.uid, movieId);
      setMovies((prev) => prev.filter((m) => m.movieId !== movieId));  
    //   toast.info("Removed from Watchlist");
    } catch (error) {
      console.error("Error removing movie:", error);
      toast.error("Failed to remove movie. Try again!");
    }
  };

  if (loading) return <p>Loading watchlist...</p>;

  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      {movies.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="watchlist-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.movieId}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(movie.movieId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
