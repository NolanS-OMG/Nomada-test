import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UploadComponent from './Components/UploadComponent';
import Actor from './Components/Actor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UploadComponent/>} />
        <Route path='/actor/:name' element={<Actor/>} />
      </Routes>
    </Router>
  );
}

export default App;
