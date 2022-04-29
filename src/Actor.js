import axios from 'axios';
import { useEffect, useState } from 'react';

import { Image, Button, Space, Typography, Row, Col, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { useAuth } from "./AuthProvider";
import { useNavigate } from 'react-router-dom';

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

const ActorCard = ({url, name, gender, popularity, moviesData}) => {

  const navigate = useNavigate();

  const { putActorData } = useAuth();

  const { Title, Text, Paragraph } = Typography

  const genderString = gender === 2 ? 'HOMBRE' : 'MUJER';
  
  const movies = moviesData.map( (movie, index) => {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    return (
      <div key={`${index+1}: ${movie.original_title}`}>
        <Row>
          <Col span={6}><Title level={4}>{movie.original_title}</Title></Col>
          <Col span={6} offset={12}>
            <Paragraph 
              mark
              style={{
                textAlign:'right'
              }}
            >{`Score: ${movie.vote_average}/10`}</Paragraph>
          </Col>
        </Row>
        <Space align='start'>
          <Image width={100} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <Space direction='vertical' >
            <Paragraph style={{textAlign:'justify'}}>{movie.overview}</Paragraph>
            <Text strong={true}>{`Fecha de estreno: ${movie.release_date.slice(9)} de ${months[parseInt(movie.release_date.slice(6,8))]} del ${movie.release_date.slice(0,4)}`}</Text>
          </Space>
        </Space>
      </div>
    )
  } )

  return (
    <Row style={{height:'fit-content',padding:'8vh 0px'}}>
      <Col span={4} offset={3} style = {{alignItems:'center'}}>
        <Button 
          type='primary'
          onClick={() => {
          putActorData({});
          navigate('/');
          }}
        ><LeftOutlined />Regresar</Button>
        <Divider plain/>
        <Image width={'fit-content'} src={url} />
        <Divider plain/>
        <Title level={3} style={{textAlign:'center'}}>{name}</Title>
        <Title style={{textAlign:'center', color:'#5a5aaa'}} level={5}>{genderString}</Title>
        <Title level={5} style={{textAlign:'center'}}>{`Popularidad: ${popularity}`}</Title>
      </Col>
      <Col span={12} offset={1}>
        <Title level={3}>Películas por las que se le conoce:</Title>
        <Divider plain></Divider>
        <Space direction='vertical' split = {<Divider plain></Divider>}>{movies}</Space>
      </Col>
      </Row>
  )
}

const Loading = ({path}) => {

  const navigate = useNavigate();

  const { actorData } = useAuth();

  useEffect( () => {
    if (actorData.actorName === undefined) {
      navigate(path);
    }
  }, [actorData, navigate, path] );

  return (
    <div>LOADING</div>
  )
}

export default Actor;