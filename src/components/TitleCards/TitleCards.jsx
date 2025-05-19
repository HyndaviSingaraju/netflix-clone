import React, { useEffect,useState } from 'react';
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from "react-router-dom"

const TitleCards = ({title,category}) => {

  const [apiData, setApiData]=useState([]);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzFlMDI0YzgwNjBkODkwMzg0MWFkZjRjYWVlNTYyYSIsIm5iZiI6MTc0NzU1MzM2Mi4zODksInN1YiI6IjY4Mjk4YzUyODRjMTdjMTEyZjhjMDFjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L6GwZ5hACII0EQSARpCALQUGjQr31f8p1Sp94C9n5RI'
  }
};
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  })

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list'>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={"https://image.tmdb.org/t/p/w500"+card.backdrop_path} alt=""/>
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  );
}

export default TitleCards;
