import React,{useEffect, useRef,useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';

const TitleCards = ({title,category}) => {
  const cardRef=useRef();
  const [apidata,setApidata]=useState([])

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Nzc0Yjc1ZGVhOTFhNTk5MmIzMzNhNDA2ZGI0ZmUyNCIsIm5iZiI6MTc2MTQxNDczNC4zNTgsInN1YiI6IjY4ZmQwZTRlZDQxMzc3YjM5ZDkyNmNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XtCFQQskwJAup0fUUPvb1NekrdMFoiIPm5fzFS76XvY'
  }
};

  function handleWheel(e){
    e.preventDefault();
    cardRef.current.scrollLeft+=e.deltaY
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApidata(res.results))
  .catch(err => console.error(err));
    cardRef.current.addEventListener('wheel',handleWheel)
  },[category])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
        {apidata.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
