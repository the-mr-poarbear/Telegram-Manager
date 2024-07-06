
import View from '../View/View.jsx';
import './ViewBotMessages.css'
import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import { Token } from '../../RoutesManeg.jsx';
import { useParams } from 'react-router-dom';







function ViewBotMessages(){
    const { bot_id } = useParams()
    const [messages , setMessages] = useState([])
    const {token} = useContext(Token)
    console.log('ey baba' , bot_id)

    useEffect(()=>{
        console.log('ey baba2')
        axios.get('http://127.0.0.1:8000/bot-messages/'+ bot_id , {headers: {'Authorization': `bearer ${token}`} }).then((response) =>{
            setMessages(response.data)
            console.log(response)
        })
    }, [])
    
    return <div>
    
        <div className='d-flex justify-content-center mt-5' >
            <View keys={['message_id','container_id','time_sent' , 'is_deleted',"content" ] } users={messages} title='View Bot Messages' />
        </div>

    </div>
}
export default ViewBotMessages;