
import React, { useState } from 'react';
import Img from '../assets/image/profile.png'
import Logo from'../assets/image/CCrafty-1.svg'
function Nav(){
    return(
<div className="navbar bg-base-100">
  <div className="flex-1 ">
   <a href="" className='btn btn-ghost text-xl'><img src={Logo} alt="" /></a> 
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
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )

}
export default Nav;