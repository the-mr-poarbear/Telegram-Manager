import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import './NavigationBar.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../../assets/media/logo.png'
import person from '../../assets/media/person.png'
import lockOp from '../../assets/media/lock open.png'
import lockCl from '../../assets/media/lock close.png'
import { Profile } from '../../RoutesManeg';




const NavigationBar = () => {
  const position = useRef('fixed')
  const [pic , setPic] = useState(lockCl)
  const {prof} = useContext(Profile)
  function LockPosition(){
    if (position.current == 'fixed'){
      setPic(lockOp)
      position.current = 'relative'
      console.log('hi')

    }else if (position.current == 'relative'){
      setPic(lockCl)
      position.current = 'fixed'
      console.log('hi')
    }

    document.getElementById('navBar').style.position = position.current 
  }

  useEffect(()=>{

    
  },[])
  return (<nav id='navBar' className="navbar navBody navbar-expand-lg fixed-top">
<div className="container-fluid">
  <a className=" fs-3 navbar-brand text-white me-auto" href="#"> <img className='w-75' src={logo}></img></a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"> </span>
  </button>
  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <div className="w-100 d-flex justify-content-md-end justify-content-center">
      <ul className="navbar-nav d-flex mx-5 justify-content-between mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/ContactUs' className="fs-6 mx-3 nav-link text-white" >Contact us</Link>
          <div className="d-flex flex-row">
            <div className="line" ></div>
            <div className="line "></div>
          </div>
        </li>
        <li className="nav-item">
        <Link to='/add-container' className=" fs-6 mx-3 nav-link text-white">Add Message Container</Link>
        </li>
        <li className="nav-item">
          <Link to='/addBot' className=" fs-6 mx-3 nav-link text-white" > Add Bot</Link>
        </li>
        <li className="nav-item">
          <Link to='/managementPanel' className=" fs-6 mx-3  nav-link navItem text-white"  >Admin Page</Link>
        </li>
        <li className='nav-item'>
          <Link to={prof.link}><button className='loginbtn'>{prof.text}</button></Link>
        </li>
        <li className='nav-item lockBtn fs-6 '>
          <img onClick={LockPosition} className='w-75 mx-3' src={pic}></img>
        </li>
        
      
      </ul>
    </div>
    
  </div>
</div>
</nav>
 
    
  );
};

export default NavigationBar;
