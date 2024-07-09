import { Link } from 'react-router-dom';
import XYChart from '../Charts/XYChart';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Token } from '../../RoutesManeg';
import { selectedProperty } from '../../RoutesManeg';




function SuperAdminContPanel(){
    const [obj , setObj] = useState({})
    const {token} = useContext(Token)
    const {selected} = useContext(selectedProperty)
    const newMessage = useRef('')
    console.log('byeeee' , selected)
    const inpTitle = [['Connected Bots' , '40px'] ,['Total Admins' , '40px'] ,['Created Since' , '20px'] ]
    const createDate = String(selected.create_date)
    const createDateSlash = createDate.slice(2,4) + '/' + createDate.slice(5,7) + '/' + createDate.slice(8,10)
    const inp = [ obj.connected_bots_count, obj.connected_admins_count ,createDateSlash]

    function AddMessage(){
        console.log('opened')
        console.log(token)
        axios.post('http://127.0.0.1:8000/add-message',{content:newMessage.current.value, container_id:selected.container_id } , {headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token_super')}`} } ).then((response) =>{console.log(response)}) 

    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/superadmin-management-container/'+ selected.container_id ,{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token_super')}`}  } ).then((response)=>{
            setObj(response.data)
            console.log(response.data)
        })
    },[selected])

    useEffect(()=>{
        if(selected){
            axios.get('http://127.0.0.1:8000/superadmin-management-container/'+ selected.container_id ,{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token_super')}`}  } ).then((response)=>{
                setObj(response.data)
                console.log(response.data)
            })
        }
    },[])
    

    return <div className='row mt-5 mx-3'>
        <div className='col-lg-7 col-12'>
            <div className='core a p-3'>
                <h5 className='btnBlue' >container info</h5>
                <p>{selected.info}</p>
            </div>

            <div className='core mt-3 d'>
                    {console.log(obj , 'obj')}
                    <h5 className='btnBlue p-3'>messages in last seven days</h5>
                    <XYChart data={obj.last_7days_log}/>
                    
            </div>
            </div>
        <div className='col-lg-3 col-6 mt-lg-0 mt-4'>
            <div className='d-flex flex-column justify-content-between core b p-3 text-center totalMessageSec'>
                <p className='mb-0 btnBlue' >Total Messages</p>
                <h1>{obj.message_count}</h1>
                
            </div>

            <div className='core e mt-3 d-flex flex-column align-items-center'>
                <textarea className='mt-2 p-2 px-2 textInput' ref={newMessage} type='text' id="w3review" name="w3review" rows="4" cols="5" placeholder='Type Here'></textarea>
                <button onClick={()=>{AddMessage()}} className='py-1 mt-2 px-3  AddMessageButton'>Add Message</button>
            </div>
        </div>
        <div className='col-lg-2 col-6 mt-4 mt-lg-0'>
            <div className='core c d-flex flex-column justify-content-evenly'>
                {inp.map((info ,index)=>{
                    return <div className='text-center btnBlue'>
                        <p>{inpTitle[index][0]}</p>
                        <h3 className='fs-md-5' style={{fontSize:inpTitle[index][1]}}>{info}</h3>
                    </div>
                })}
            </div>
        </div>

        

        
    </div>
}

export default SuperAdminContPanel;