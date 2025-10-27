import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { auth, addToWatchlist, removeFromWatchlist, getWatchlist } from "../../firebase";
import { toast } from "react-toastify";

const TitleCards = ({ title, category }) => {
  const cardRef = useRef();
  const [apidata, setApidata] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Nzc0Yjc1ZGVhOTFhNTk5MmIzMzNhNDA2ZGI0ZmUyNCIsIm5iZiI6MTc2MTQxNDczNC4zNTgsInN1YiI6IjY4ZmQwZTRlZDQxMzc3YjM5ZDkyNmNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XtCFQQskwJAup0fUUPvb1NekrdMFoiIPm5fzFS76XvY",
    },
  };

   const handleWheel = (e) => {
    e.preventDefault();
    cardRef.current.scrollLeft += e.deltaY;
  };

   useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApidata(res.results || []))
      .catch((err) => console.error(err));

    if (cardRef.current) {
      cardRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

   useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      getWatchlist(user.uid).then((data) => setWatchlist(data.map((m) => m.movieId)));
    }
  }, []);

   const handleWatchlist = async (movie) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login to manage your watchlist!");
      return;
    }

    try {
      const isInWatchlist = watchlist.includes(movie.id);

      if (isInWatchlist) {
        await removeFromWatchlist(user.uid, movie.id);
        setWatchlist((prev) => prev.filter((id) => id !== movie.id));
        // toast.info(`${movie.title} removed from watchlist.`);
      } else {
        await addToWatchlist(user.uid, movie);
        setWatchlist((prev) => [...prev, movie.id]);
        // toast.success(`${movie.title} added to watchlist!`);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apidata.map((card, index) => {
          const inWatchlist = watchlist.includes(card.id);
          return (
            <div className="card" key={index}>
              <Link to={`/player/${card.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                />
              </Link>
              <div className="card-info">
                <p>{card.original_title}</p>
                <button
                  className={`watchlist-btn ${inWatchlist ? "remove" : ""}`}
                  onClick={() => handleWatchlist(card)}
                >
                  {inWatchlist ? "− Remove" : "+ Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
