import InputTextAdd from '../Inputs/InputTextAdd';

import { DropDownSearchForAdd } from '../DropDownSearchForAdd/DropDownSearchForAdd.jsx';
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'
import './AddBot.css'
import { createContext, useRef, useState } from 'react';
import axios from 'axios';
import InputText from '../Inputs/inputText.jsx';

export const selectedThing = createContext()

function AddBot(){
    // get userId
    const[refresh , setRefresh] = useState(true)
    const [Containers , setContainers] = useState({'message_containers':[] , 'comment_containers':[]})
    const [containerM2bAdded , setContainerM2bAdded] = useState({})
    const [containerC2bAdded , setContainerC2bAdded] = useState({})
    const [selectedMesConts , setSelectedMesConts]= useState([])
    const [selectedComConts , setSelectedComConts]= useState([])
    const [selectedAdmins , setSelectedAdmins]= useState([])
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
                    selectedConts.push(cont2.container_id)
                }
            })
        })

        selectedComConts.map((cont)=>{
            Containers['comment_containers'].map((cont2)=>{
                if(cont2.title == cont){
                    selectedConts.push(cont2.container_id)
                }
            })
        })

        axios.post('http://127.0.0.1:8000/add-bot',{bot: {username: username.current.value , title:title.current.value , info:info.current.value} , admin_usernames: selectedAdmins , containers: selectedConts },{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
             console.log(response.data , 'resresresjiooijioj')
        })

        console.log({bot: {username: username.current.value , title:title.current.value , info:info.current.value} , admin_usernames: selectedAdmins , containers: selectedConts })
        
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
                        
                           
           
                    <DropDownSearchForAdd   
                            Fetch={FetchContainers} 
                            messageContainersOrBots={Containers['message_containers']} 
                            bAdded={containerM2bAdded} 
                            title={'Message Containers'}
                            setbAdded={setContainerM2bAdded}  
                            selectedEn={selectedMesConts}
                            setSelectedEn={setSelectedMesConts}
                            setRefresh={setRefresh}
                            refresh={refresh}

                    />

                    

                    <DropDownSearchForAdd   
                            Fetch={FetchContainers} 
                            messageContainersOrBots={Containers['comment_containers']} 
                            bAdded={containerC2bAdded} 
                            title={'Comment Containers'}
                            setbAdded={setContainerC2bAdded}  
                            selectedEn={selectedComConts}
                            setSelectedEn={setSelectedComConts}
                            setRefresh={setRefresh}
                            refresh={refresh}
                    />

            
                                   
                                    
                <InputTextAdd title='Admins' reff={admin_usernames} setSelectedAdmins={setSelectedAdmins} selectedAdmins={selectedAdmins} />
                    

                       
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