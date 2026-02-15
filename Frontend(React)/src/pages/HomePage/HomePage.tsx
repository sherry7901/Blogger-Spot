import React from 'react'
import './HomePage.css'
import {Link} from 'react-router-dom'
import Main from '../../components/MainBody/Main'
import Dashbord from '../../components/Dashboard/Dashbord'
import Footer from '../../components/Footer/Footer'



const HomePage = () => {
  return (
    <div className='Home'>
      
        <Dashbord/>
        <Main/>
        
        <Footer/>
        
    </div>
  )
}

export default HomePage
