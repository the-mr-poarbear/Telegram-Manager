import InputTextAdd from '../Inputs/InputTextAdd';

import { DropDownSearchForAdd } from '../DropDownSearchForAdd/DropDownSearchForAdd.jsx';
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'
import { createContext, useRef, useState } from 'react';
import axios from 'axios';
import InputText from '../Inputs/inputText.jsx';

function AddContainer(){
    // get userId
    const[refresh , setRefresh] = useState(true)
    const [bots , setBots] = useState([])
    const [bot2bAdded , setBot2bAdded] = useState({})
    const [selectedBots , setSelectedBots]= useState([])
    const [selectedAdmins , setSelectedAdmins]= useState([])
    const title = useRef('')
    const info = useRef('')
    const typeID = useRef(1)
    const admin_usernames = useRef([])

    function FetchBots(){
        axios.get('http://127.0.0.1:8000/all-bots',{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
            setBots(response.data)
            console.log(response.data , 'resresres')
        })
    }

    function AddContainer(){
        let selectedBotsID = []

        selectedBots.map((bot)=>{
            bots.map((bot2)=>{
                if(bot2.title == bot){
                    selectedBotsID.push(bot2.bot_id)
                }
            })
        })
        axios.post('http://127.0.0.1:8000/add-container',{container: {type_id: typeID.current , title:title.current.value , info:info.current.value} , admin_usernames: selectedAdmins , bots: selectedBotsID },{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
             console.log(response.data , 'resresresjiooijioj')
        })

        console.log({container: {type_id: typeID.current.value , title:title.current , info:info.current.value} , admin_usernames: selectedAdmins , bots: selectedBotsID })
        
    }

    return (
    <div className='w-100 d-flex flex-column align-items-center'>
       
        {console.log(selectedBots , 'seleelelel')}
        <NavigationBar/>
        <div className='w-100 d-flex flex-column align-items-center ' style={{margin:'200px 0'}}>
            <div className='text-white px-3 w-100 my-5 addBot rounded'><h2 className='py-2'>Add Container</h2></div>
            <div className="container d-flex flex-column form-control addBot py-5" style={{border:'none'}}>
                
                 
                <InputText title='Name' reff={title} checkBox={true} check={typeID}/>
            
                
                        
                           
              
                    <DropDownSearchForAdd   
                            Fetch={FetchBots} 
                            messageContainersOrBots={bots} 
                            bAdded={bot2bAdded} 
                            title={'Bot Containers'}
                            setbAdded={setBot2bAdded}  
                            selectedEn={selectedBots}
                            setSelectedEn={setSelectedBots}
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
                      

                            <button onClick={AddContainer} className='mt-4 w-25'>Submit</button>  
            
            </div> 
               
        </div>  
        <Footer/>
    </div>)  
    
    }

export default AddContainer;