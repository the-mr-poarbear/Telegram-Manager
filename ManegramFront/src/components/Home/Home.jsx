import { useContext, useEffect, useState } from 'react'
import './Home.css'
import Footer from '../Footer/Footer.jsx'
import lock from '../../assets/media/lock.png'
import cloud from '../../assets/media/cloud.png'
import CardHome from '../CardHome/CardHome.jsx'
import CardYCU from '../CardYCU/CardYCU.jsx'
import NavigationBar from '../NavigationBar/NavigationBar.jsx'
import teleg from '../../assets/media/teleg.png'
import axios from 'axios'
import { PropertyContext } from '../../RoutesManeg.jsx'




function Home() {
  const {properties , setProperties} = useContext(PropertyContext)
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/validateToken', {headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response) =>{
          
      if(response.data){
          console.log(response.data.access_token)
          localStorage.setItem('accsess_token',response.data.access_token)
          axios.get('http://127.0.0.1:8000/admin-management-panel',{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
              console.log(response.data)
              setProperties(response.data)
              console.log(properties , 'khi')
          })
          
      }})
  },[])

  return (
    <div className='home'>
    <NavigationBar/>
    
    <div className='row d-flex justify-content-around text-white intro'>
      <div className='col-md-5 order-md-1 order-2 col-8 text-start text-md-start text-center' style={{fontSize:"25px"}}>
        <h1 className='mb-3'><span style={{color:"#0094FF"}} >M</span>anegram</h1>
        <p style={{fontSize:"20px", letterSpacing:'3px', color:"#0094FF"}}> Best Telegram Bot Manager In World </p>
        <p><span style={{color:"#0094FF"}} >M</span>anage and orgnize your bots and the messages they send with the help of just one click </p>
        <button className='mt-5 buttonHome'>Lets Go!</button>
      </div>
      
      <div className='order-md-2 order-1 col-md-5 col-8  p-0'>
        <img className='imgHome' src={teleg}></img>
      </div>
      
    </div>

    
    <div className='row d-flex  justify-content-evenly back '>
      <CardHome title={'Manage Your Bots'}  body={'search doctors by name and view them based on rating'}/>
      <CardHome title={'Add Message Containers'}  body={'Enter Visit or File ID to view results'}/>
      <CardHome title={'Track Your Products Growth'}  body={'search doctors by name and view them based on rating'}/>
    </div>
    
    
    <div className='YCUDiv d-flex flex-column justify-content-center'>

      <h1 className=' YCU text-center w-100 text-white'>Why Choose Us</h1>
    </div>

    <div className='row d-flex justify-content-evenly backYCU'>
      <CardYCU icon={lock} title="We Care For Your Privacy"/>
      <CardYCU icon={cloud} title="We Care For Your Data"/>
      <CardYCU icon={teleg} title="We Care For Your Experience"/>
    </div>
      
    <Footer/>
    </div>
  )
}

export default Home
