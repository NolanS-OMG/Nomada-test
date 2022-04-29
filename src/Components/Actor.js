import axios from 'axios';
import { useEffect, useState } from 'react';

import ActorCard from './ActorCard';
import Loading from './Loading';

import { useAuth } from "../AuthProvider";

const Actor = () => {
  
  const getData = async() => {
    if (!data && actorData.actorName) {
      const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=es-MX&query=${actorData.actorName.replace(' ', '%20')}&page=1&include_adult=false`
      await axios.get(url).then(res => {
        setData(res.data.results[0])
      })
    }
  };

  const { actorData, putActorData } = useAuth();
  
  const [data, setData] = useState(false);

  useEffect( () => {
    window.onpopstate = e => {
      putActorData({});
    }
    getData();
  } );

  return (
    data ? <ActorCard 
      url = {`https://image.tmdb.org/t/p/w500${data.profile_path}`}
      name = {data.name}
      gender = {data.gender}
      popularity = {data.popularity}
      moviesData = {data.known_for}
    /> : <Loading path='/' />
  )
}

export default Actor;