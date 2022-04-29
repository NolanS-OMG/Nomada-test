import 'antd/dist/antd.css';

import { Upload, message, Typography, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import axios from 'axios';

import { useAuth } from '../AuthProvider';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const UploadComponent = () => {

  const { actorData, putActorData } = useAuth();
  const navigate = useNavigate();

  const { Title } = Typography

  useEffect( () => {
    if (actorData.actorName) {
      const url = '/actor/' + actorData.actorName.toLowerCase().replace(/\x20/g, '');
      navigate(url);
    }
  }, [actorData, navigate] )

  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: false,
    customRequest(options) {
      const { onSuccess, onError, file } = options;
      const fmData = new FormData();
      fmData.append("file", file);
      axios.post("https://whois.nomada.cloud/upload", fmData, {
        headers: {
          "Nomada": "OTM4Y2UxZDgtNGIwNi00NTkzLTk5MjgtMDYyMjVjNDY0NGNm",
        },
        body: {"file": JSON.stringify(file)}
      })
      .then(res => {
        onSuccess(file);
        if (res.data.error === 'No sé quien es, intenta con otra foto') {
          alert(res.data.error);
        } else {
          putActorData(res.data);
        }
      })
      .catch(err=>{
        const error = new Error(err);
        onError({event:error});
      });
    },
    accept: '.jpg,.jpeg,.png',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Space 
      direction="vertical" 
      size={30}
      align='center'
      style={
        { 
          display: 'flex',
          padding: '35px',
          margin: 'auto',
          boxShadow: '0px 0px 5px #dedeff',
          background:'white'
        }
      }
    >
      <Title>¿Quién es este actor?</Title>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haga click o arrastre una imagen en este área.</p>
        <p 
          className="ant-upload-hint"
          style={
            { 
              marginLeft: '5px',
              marginRight: '5px',
            }
          }
        >
          Selecciona la foto de un actor famoso para saber quien es o en que películas a estado.
        </p>
      </Dragger>
    </Space>
  )
}

export default UploadComponent