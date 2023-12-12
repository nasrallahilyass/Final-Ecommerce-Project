// import Hero from "./Hero";

import React from 'react';
import { useSelector } from 'react-redux';
import Hero from './Hero'; 

function HomeScreen() {
  const { jwt } = useSelector((state) => state.auth); 

  return(
    <div>
            {jwt ? null : <Hero />} 

    </div>
  );
  
}

export default HomeScreen;