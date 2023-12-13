import React from 'react'
import Products from './Products'
import Sidebar from '../components/Sidebar'
import Nav from'../components/Nav'
import Subcategories from './Subcategories'
import Categorie from './Categorie'
function ADashboard() {

  return (
    <div className=''>
        <Sidebar/>
        <div className=' w-screen pl-[4.25rem]'>
        <Nav/>
        
        <Products/>
        
        </div>
    </div>
  )
}
export default ADashboard