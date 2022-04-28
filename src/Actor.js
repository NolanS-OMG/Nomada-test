import axios from 'axios';
import { useEffect, useState } from 'react';

import { Image, Button } from 'antd';

import { useAuth } from "./AuthProvider";
import { useNavigate } from 'react-router-dom';

const Actor = () => {
  
  const getData = async() => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=es-MX&query=${actorData.actorName.replace(' ', '%20')}&page=1&include_adult=false`
    await axios.get(url).then(res => {
      setData(res.data.results[0])
    })
  }

  const { actorData } = useAuth()
  
  const [data, setData] = useState(false)

  useEffect( () => {
    getData();
  } );

  return (
    data ? <ActorCard 
      url = {`https://image.tmdb.org/t/p/w500${data.profile_path}`}
      name = {data.name}
      gender = {data.gender}
      popularity = {data.popularity}
      moviesData = {data.known_for}
    /> : <h1>Loading</h1>
  )
}

const ActorCard = ({url, name, gender, popularity, moviesData}) => {

  const navigate = useNavigate();

  const { putActorData } = useAuth()

  const genderString = gender === 2 ? 'Hombre' : 'Mujer';
  
  const movies = moviesData.map( (movie, index) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    return (
      <div key={`${index+1}: ${movie.original_title}`}>
        <h5>{movie.original_title}</h5>
        <span>{`Score: ${movie.vote_average}/10`}</span>
        <div>
          <Image width={75} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <p>{movie.overview}</p>
          <b>{`Fecha de estreno: ${movie.release_date.slice(9)} de ${months[parseInt(movie.release_date.slice(6,8))]} del ${movie.release_date.slice(0,4)}`}</b>
        </div>
      </div>
    )
  } )

  return (
    <div>
      <div>
        <Image width={150} src={url} />
        <h4>{name}</h4>
        <span>{genderString}</span>
        <h6>{`Popularidad: ${popularity}`}</h6>
      </div>
      <div>
        <h4>Películas</h4>
        {movies}
      </div>
      <Button 
        type='primary'
        onClick={() => {
          putActorData({});
          navigate('/');
        }}
      >Regresar</Button>
    </div>
  )
}

export default Actor;