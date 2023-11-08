import './App.css'
import AboutUs from './component/aboutus.component'
import Footer from './component/footer.component'
import Main from './component/main.component'
import Navbar from './component/navbar.component'
  import Services from './component/slider.component'
import IconCard from './component/sponsor.component'

function App() {

  return (
    <>
      <Navbar/>
      <Main/>
      <AboutUs/>
      <Services/>
      <IconCard/>
      <Footer/>
    </>
  )
    
}

export default App
