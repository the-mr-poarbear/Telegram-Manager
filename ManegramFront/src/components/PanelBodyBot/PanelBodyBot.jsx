import { Link, useNavigate } from 'react-router-dom';
import './PanelBodyBot.css'
import XYChart from '../Charts/XYChart';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { selectedProperty, Token } from '../../RoutesManeg';
import OptionButton from '../OptionButton/OptionButton';






function PanelBodyBot(){
    const [obj , setObj] = useState({bot:{last_active:'N/A'}})
    const {token} = useContext(Token)
    const {selected , setSelected } = useContext(selectedProperty)
    const newMessage = useRef('')
    console.log('byeeee' , selected)
    console.log('hiiiiiiiiiiiiii' , obj)
    const inpTitle = ['Connected Containers' ,'Total Admins' ,'Created Since' , 'Last Active' ]
    const createDate = String(selected.create_date)
    const createDateSlash = createDate.slice(2,4) + '/' + createDate.slice(5,7) + '/' + createDate.slice(8,10)
    const inp = [ obj.connected_containers_count, obj.connected_admins_count ,createDateSlash , obj.bot.last_active]
    const manage = useNavigate()

    useEffect(()=>{
        console.log('vrhnilrhi')
        axios.get('http://127.0.0.1:8000/admin-management-bot/'+ selected.bot_id ,{headers: {'Authorization': `bearer ${token}`} } ).then((response)=>{
            setObj(response.data)
            console.log(response.data , 'resss')
        })
    },[selected])
    

    return <div className='row mt-5 mx-3'>
        <div className='col-lg-7 col-12'>
            <div className='core a p-3'>
                <h5 className='btnBlue' >Bot info</h5>
                <p>{selected.info}</p>
            </div>

            <div className='core mt-3 d'>
                    {console.log(obj , 'obj')}
                    <h5 className='btnBlue p-3'>messages in last seven days</h5>
                    <XYChart data={obj.last_7days_log}/>
                    <Link to='./'><button className='mx-5 mt-1 mb-3'>See More</button></Link>
            </div>
            </div>
        <div className='col-3'>
            <div className='d-flex flex-column justify-content-between core b p-3 text-center totalMessageSec'>
                <p className='mb-0 btnBlue' >Total Messages</p>
                <h1>{obj.message_count}</h1>
                <Link to={`/managementPanel/bot-message/${selected.bot_id}`} ><button className='py-1 px-3'>See Messages</button></Link>
            </div>

            <div className='core e mt-3 d-flex flex-column align-items-center'>
                <OptionButton title='Send Message' link='/managementPanel/sendMessage' />
            </div>
        </div>
        <div className='col-2'>
            <div className='core c d-flex flex-column justify-content-evenly'>
                {inp.map((info ,index)=>{
                    return <div className='text-center btnBlue'>
                        <p>{inpTitle[index]}</p>
                        <h3 style={{fontSize:'2vw'}}>{info}</h3>
                    </div>
                })}
            </div>
        </div>

        

        
    </div>
}

export default PanelBodyBot;