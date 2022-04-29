import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { useAuth } from "../AuthProvider";

const Loading = ({path}) => {

  const navigate = useNavigate();

  const { actorData } = useAuth();

  useEffect( () => {
    if (actorData.actorName === undefined) {
      navigate(path);
    }
  }, [actorData, navigate, path] );

  return (
    <div style={
      {
        display:'flex',
        width:'100vw',
        height:'100vh'
      }
      }>
      <LoadingOutlined
        style={{
          margin:'auto'
        }}
      />
    </div>
  )
}

export default Loading