import './App.css'
import { Routes, Route } from 'react-router-dom';


import LangingPage from './pages/landingPage'
import ProductsPage from './pages/productsPage'
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <Routes>
        <Route path='/' element={<LangingPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
    </Routes>
  )
    
}

export default App
