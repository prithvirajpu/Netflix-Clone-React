import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const navigate=useNavigate()
  const {id}=useParams();
  const [apidata,setApidata]=useState({
    name:'',key:'',type:'',published_at:''
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Nzc0Yjc1ZGVhOTFhNTk5MmIzMzNhNDA2ZGI0ZmUyNCIsIm5iZiI6MTc2MTQxNDczNC4zNTgsInN1YiI6IjY4ZmQwZTRlZDQxMzc3YjM5ZDkyNmNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XtCFQQskwJAup0fUUPvb1NekrdMFoiIPm5fzFS76XvY'
  }
};
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApidata(res.results[0]))
  .catch(err => console.error(err));
  },[id])

  return (
    <div className='player' >
      <img src={back_arrow}  onClick={()=>{if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate('/'); 
        }}} />
      <iframe 
      src={`https://www.youtube.com/embed/${apidata.key}`} 
      width='90%' height='90%' frameBorder="0"
      title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apidata.published_at.slice(0,10)}</p>
        <p>{apidata.name} </p>
        <p>{apidata.type} </p>
      </div>
    </div>
  )
}

export default Player
