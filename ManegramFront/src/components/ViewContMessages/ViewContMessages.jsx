
import View from '../View/View.jsx';
import './ViewContMessages.css'
import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import { Token } from '../../RoutesManeg.jsx';
import { useParams } from 'react-router-dom';







function ViewContMessages(){
    const { container_id } = useParams()
    const [messages , setMessages] = useState([])
    const {token} = useContext(Token)
    console.log('ey baba' , container_id)

    useEffect(()=>{
        console.log('ey baba2')
        axios.get('http://127.0.0.1:8000/container-messages/'+ container_id , {headers: {'Authorization': `bearer ${token}`} }).then((response) =>{
            setMessages(response.data)
            console.log(response)
        })
    }, [])
    
    return <div>
        <NavigationBar/>
        <div className='d-flex justify-content-center' style={{marginTop:'150px'}}>
            <View keys={['message_id','times_used',"last_used" ,'message_content'] } users={messages} title='View Containers' />
        </div>

        <Footer/>
    </div>
}
export default ViewContMessages;