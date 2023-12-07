import React from 'react'
import Products from './Products'
import Sidebar from '../components/sidebar'
import Nav from'../components/Nav'
function Dashboard() {

  return (
    <div className=''>
        <Sidebar/>
        <div className='flex flex-col w-screen pl-[4.25rem]'>
        <Nav/>
        <Products/> 
        </div>
    </div>
  )
}
export default Dashboard