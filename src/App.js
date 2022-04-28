import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UploadComponent from './UploadComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UploadComponent/>} />
        <Route path='/actor/:name' element={<h1>Olo</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
