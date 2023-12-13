
import React, { useState } from 'react';
import Img from '../assets/image/profile.png'
import Logo from'../assets/image/out.png'
import { Link } from 'react-router-dom';
function Nav(){
    return(
<div className="navbar bg-base-100">
  <div className="flex-1 ">
   <a href="" ><img src={Logo} alt="" className='btn btn-ghost'/></a> 
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  avatar online">
        <div className="w-10 rounded-full ">
          <img alt="Tailwind CSS Navbar component" src={Img} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        <Link to="/profile">
        <a className="justify-between">
            Profile
          </a>
      </Link>
        </li>
        <Link to="/profile"><li><a>Logout</a></li> </Link>
      </ul>
    </div>
  </div>
</div>
  )

}
export default Nav;