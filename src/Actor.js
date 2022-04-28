import axios from 'axios';
import { useEffect, useState } from 'react';

import { Image } from 'antd';

import { useAuth } from "./AuthProvider";

const Actor = () => {
  
  const getData = async() => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&language=en-US&query=${actorData.actorName.replace(' ', '%20')}&page=1&include_adult=false`
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
    /> : <h1>Loading</h1>
  )
}

const ActorCard = ({url, name, gender, popularity}) => {
  const genderString = gender === 2 ? 'Hombre' : 'Mujer'
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

      </div>
    </div>
  )
}

export default Actor;