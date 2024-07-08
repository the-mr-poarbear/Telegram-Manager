import React, { useContext, useEffect, useRef, useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { Navigate, useNavigate } from "react-router-dom";
import'./ManagementPanel.css'
import SidePanelProfile from '../SidePanelProfile/SidePanelProfile';
import { PropertyContext, selectedBotProp, selectedProperty } from '../../RoutesManeg';
import { Outlet } from 'react-router-dom';
import axios from 'axios';


function ManagementPanel(){
    const {properties , setProperties} = useContext(PropertyContext)

    let messageConts=properties.message_containers
    const commentConts=properties.comment_containers
    const bots=properties.bots
    const manage = useNavigate()

    const {selected , setSelected} = useContext(selectedProperty)
    console.log('gi',properties.message_containers)
  
    const first = useRef(true)

    useEffect(()=>{
        console.log(first.current)
        if (first.current && selected == {title:'Container or Bot Name'}){
            first.current = false
        } else {
            console.log('entered')
            first.current = true
            if(selected['bot_id'] == null){
                console.log(selected , 'goh')
                manage('/managementPanel/panel')

            }else if(selected['bot_id']){
                console.log(selected , 'goh')
                manage('/managementPanel/panelBot')
            }else{
                console.log('nope')
            }

            
        }
        
      },[selected])

      useEffect(()=>{
        axios.get('http://127.0.0.1:8000/admin-management-panel',{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
            console.log(response.data)
            setProperties(response.data)
            console.log(properties , 'khiiiiiiiiiiiiiiiii')
        })
      },[])

    return <div className='d-flex flex-column align-items-center'>
        {console.log(selected , properties , messageConts , 'see it')}
        <NavigationBar/>
       
        
        <div className='row text-white wholeThing d-flex justify-content-center'>
            <div className='w-100 row d-flex justify-content-center'>
                <div className='col-3 d-none d-lg-block' ><div className='shell p-0'><h2 className='p-2 mb-0 ps-3 btnBlue'>Items</h2></div></div>
                <div className='col-lg-9 col-12 p-0 mb-3'><div className='shell '  ><h2 className='p-2 ps-5 fs-1 btnBlue'>{selected.title}</h2></div></div>
            </div>
            
            <SidePanelProfile keys={messageConts} keys2={commentConts} keys3={bots}/>
            <div className='col-3 d-none d-lg-block' style={{overflow:'hidden'}}>
                <div className='shell long' style={{overflow:'hidden'}}>
                    
                    <ul className=' p-0 '>
                        <li className='mb-5'>
                            <button type="button" className="btn text-white mt-5" data-bs-toggle="collapse" data-bs-target="#demo"><h5>Message Containers</h5></button>
                            <div id="demo" className="collapse ">
                                <ul className=''>
                                    {messageConts?.map((messageCont)=>{
                                        return <li onClick={(event)=> {setSelected(messageCont)}} className='my-1 panelOP'>{messageCont.title}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>

                        <li className='mb-5'>  
                            <button type="button" className="btn text-white" data-bs-toggle="collapse" data-bs-target="#demo1"><h5>Comment Containers</h5></button>
                            <div id="demo1" className="collapse ">
                                <ul>
                                    {commentConts?.map((commentCont)=>{
                                        return <li onClick={(event)=> setSelected(commentCont)} className='my-1'>{commentCont.title}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>

                        <li>
                        <button type="button" className="btn text-white" data-bs-toggle="collapse" data-bs-target="#demo2"><h5>Bots</h5></button>
                            <div id="demo2" className="collapse ">
                                <ul>
                                    {bots?.map((bot)=>{
                                        return <li onClick={(event)=> {setSelected(bot) ; console.log('clicked')}} className='my-1'>{bot.title}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='col-lg-9 col-12 row'>
                <div className='shell long'>
               
                        <selectedProperty.Provider value={{ selected,setSelected }}>
                            <Outlet/>
                        </selectedProperty.Provider>
                   
                    
                </div>
                
            </div>
        </div>
    </div>
}

export default ManagementPanel;