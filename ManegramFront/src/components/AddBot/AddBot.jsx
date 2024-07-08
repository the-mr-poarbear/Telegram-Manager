import InputTextAdd from '../Inputs/InputTextAdd';

import { DropDownSearchForAdd } from '../DropDownSearchForAdd/DropDownSearchForAdd.jsx';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'
import './AddBot.css'
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { selectedProperty, Token } from '../../RoutesManeg';
import SearchableDropdown from '../SearchableDropDown/SeachableDropdown';
import axios from 'axios';
import InputText from '../Inputs/inputText.jsx';

export const selectedThing = createContext()

function AddBot(){
    // get userId
    const[refresh , setRefresh] = useState('')
    const [Containers , setContainers] = useState({'message_containers':[] , 'comment_containers':[]})
    const [containerM2bAdded , setContainerM2bAdded] = useState({})
    const [containerC2bAdded , setContainerC2bAdded] = useState({})
    const [selectedMesConts , setSelectedMesConts]= useState([])
    const [selectedComConts , setSelectedComConts]= useState([])
    const [BotObj , setBotObj] = useState({bot: {username:'' , title:'' , info:''} , admin_usernames: [] , containers: [] })
    const username = useRef('')
    const title = useRef('')
    const info = useRef('')
    
    const admin_usernames = useRef([])
    const containers = useRef([])
    function FetchContainers(){
        axios.get('http://127.0.0.1:8000/all-containers',{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
            setContainers(response.data)
            console.log(response.data , 'resresres')
        })
    }

    function ConvertToID(selectedMesConts , selectedComConts){
        
        let selectedConts = []
        selectedMesConts.map((cont)=>{
            Containers['message_containers'].map((cont2)=>{
                if(cont2.title == cont){
                    selectedConts.add(cont2.container_id)
                }
            })
        })

        selectedComConts.map((cont)=>{
            Containers['comment_containers'].map((cont2)=>{
                if(cont2.title == cont){
                    selectedConts.add(cont2.container_id)
                }
            })
        })

        setBotObj({bot: {username: username.current.value , title:title.current.value , info:info.current.value} , admin_usernames: admin_usernames.current.value , containers: selectedConts })
        console.log(BotObj , 'sth')
    }

    return (
    <div className='w-100 d-flex flex-column align-items-center'>
       
        {console.log(selectedComConts , selectedMesConts , 'seleelelel')}
        <NavigationBar/>
        <div className='w-100 d-flex flex-column align-items-center ' style={{margin:'200px 0'}}>
            <div className='text-white px-3 w-100 my-5 addBot rounded'><h2 className='py-2'>Add Bot</h2></div>
            <div className="container d-flex flex-column form-control addBot py-5" style={{border:'none'}}>
                
                    
                <InputText title='Name' reff={title} />
            
                <InputText title='Username' reff={username} />
                        
                           
                <selectedThing.Provider value={{refresh , setRefresh}}>
                    <DropDownSearchForAdd   
                            FetchContainers={FetchContainers} 
                            messageContainers={Containers['message_containers']} 
                            container2bAdded={containerM2bAdded} 
                            title={'Message Containers'}
                            setContainer2bAdded={setContainerM2bAdded}  
                            selectedMesConts={selectedMesConts}
                            setSelectedMesConts={setSelectedMesConts}
                          

                    />

                    <DropDownSearchForAdd   
                            FetchContainers={FetchContainers} 
                            messageContainers={Containers['comment_containers']} 
                            container2bAdded={containerC2bAdded} 
                            title={'Comment Containers'}
                            setContainer2bAdded={setContainerC2bAdded}  
                            selectedMesConts={selectedComConts}
                            setSelectedMesConts={setSelectedComConts}
                          
                    />

                </selectedThing.Provider>
                                   
                                    
                <InputTextAdd title='Admins' ref={admin_usernames} />
                    

                       
                           <div className="d-flex justify-content-between row row-cols-6 ">
                                <div className="col-2 ">&nbsp;</div>
                                <div className="col-8 d-flex justify-content-center row">
                                    <div className="col-2 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block ">Info</label>

                                    <div  className="p-3 py-4 pe-5  col-9 blackDiv">
                                        <textarea ref={info} defaultValue='Info' className="form-control pb-5 w-100 addBotTextAra inputColor text-white" type="text text-white"
                                            > </textarea>
                                    </div>

                                </div>
                                <div className="col-2">&nbsp;</div>
                            </div>
                      

                            <button onClick={()=>ConvertToID(selectedMesConts , selectedComConts)}className='mt-4 w-25'>Submit</button>  
            
            </div> 
               
        </div>  
        <Footer/>
    </div>)  
    
    }

export default AddBot;