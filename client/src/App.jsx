import './App.css'

import Signup from './components/signup'
import Login from './components/login'
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      
        <Route path="/costumer" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
      
    </Routes>
  );
}

export default App;
