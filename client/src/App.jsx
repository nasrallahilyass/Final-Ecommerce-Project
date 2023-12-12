import './App.css'
import { Routes, Route } from 'react-router-dom';


import LangingPage from './pages/landingPage'
import ProductsPage from './pages/productsPage'


function App() {

  return (
    <Routes>
        <Route path='/' element={<LangingPage />} />
        <Route path='/products' element={<ProductsPage />} />
    </Routes>
  )
    
}

export default App
