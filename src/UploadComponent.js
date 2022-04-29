// Es la primera vez que uso ANTD, en la rama 'test' pondré muchos comentarios explicativos por si la uso de nuevo

// Importamos el CSS que está dentro de /node_modules
import 'antd/dist/antd.css';

// 'Upload': Objeto que contiene el 'Dragger', en este caso solo lo utilizamos para eso, seguramente tiene otras utilidades que no conozco
// 'message': Objeto que contiene un montón de funciones, se ven claramente con un 'console.log()'
import { Upload, message, Typography, Space } from 'antd';
// 'InboxOutlined': Es el logo de una caja que se ve bien padre :v
import { InboxOutlined } from '@ant-design/icons';

import axios from 'axios';

import { useAuth } from './AuthProvider';
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

  // Aquí sacamos el 'Dragger'
  const { Dragger } = Upload;

  // El nombre del objeto es 'props' pero no se refiere a los atributos de un componente padre, solo es su nombre
  const props = {
    // 'name' es equivalente a 'type' de los input
    name: 'file',
    // 'multiple': Si es true, permite subir mas de un archivo AL MISMO TIEMPO (arrastrando con control o eligiendo varios), si es false solo uno
    multiple: false,
    // En vez de usar 'action' que solo sube el archivo, usamos 'customRequest' para que se ejecute la función que necesitemos
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
    // 'accept': Equivalente al 'accept' de los 'input'
    accept: 'image/*',
    // 'onChange': Cuando cambia el 'estado de subida' ósea, desde que se empieza a subir hasta que termina, esta función de ejecuta
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