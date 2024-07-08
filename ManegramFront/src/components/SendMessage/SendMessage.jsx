
import { useContext, useEffect, useState } from 'react';
import './SendMessage.css'
import SendMessageButton from './SendMessageButton';
import SendMessageEnv from './SendMessageEnv';
import { selectedProperty, Token } from '../../RoutesManeg';
import axios from 'axios';


function SendMessage(){

    const [conts , setConts] = useState([])
    const [selectedContMessages , setSelectedContMessages] = useState([])
    //const [selectedCont , setSelectedConts] = useState({})
    const {selected} = useContext(selectedProperty)
    const {token} = useContext(Token)

    function SetMessages(container_id){
        axios.get('http://127.0.0.1:8000/container-messages/'+ container_id , {headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} }).then((response) =>{
            setSelectedContMessages(response.data)
            console.log(response)
        })
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/bot-containers/'+ selected.bot_id , {headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} }).then((response) =>{
            setConts(response.data)
            console.log(response.data , 'conts')
        })
    },[])

    return(
        <div className='d-flex flex-column align-items-center'>
            <div className="justify-content-md-between  d-flex justify-content-center  row " style={{width:'95%'}}>

<div className=" col-md-4  col-sm-5">
    <p  className="mt-md-5 pb-md-3 fs-4 blueCol"> Container </p>
    <div style={{height:'60vh'}} className="blueBack pt-md-4 d-flex flex-column align-items-center row row-cols-1 container rounded-4 overflow-auto  py-2">
        
        {conts.map(cont=>{
            console.log(cont , 'no rly cont')
            return <button onClick={()=>SetMessages(cont.container_id)} style={{color: '#0094FF', backgroundColor:' #081D3C',width:'85%' , border: 'solid #0094FF 2px' , borderRadius:'10px'}} type="button"
            className="btn border-2 button py-md-1 mt-md-4 fw-bolder d-flex justify-content-between text-center rounded-3 fs-5 mt-1"><p></p><p className='m-0'>{cont.title}</p> <i class="bi bi-caret-right"></i></button>
        })}

    </div>

</div>

<div className="col-md-8  col-sm-9 mt-sm-4 mt-md-0">
    <p  className="mt-md-5 pb-md-3 fs-4 blueCol" id="container_message"> Message </p>
    <div style={{height:'60vh'}} className="pt-md-4  blueBack d-flex flex-column align-items-center container rounded-4 overflow-auto py-2">

        {selectedContMessages.map((message)=>{
            return <SendMessageEnv message={message}/>
        })}
        
        
    </div>

</div>
<div></div>

<div className="col-md-3 me-md-0 d-flex justify-content-center justify-content-md-center mt-5 w-100 "><button
        className="blueBack w-25 text-white py-3 text-decoration-none rounded-4 border-0 fs-4">submit</button></div>


</div>
        </div>
        
    )
}

export default SendMessage;


    function SendMessageEnvv({}) {
      return (<div style={{
  color: '#0094FF',
  backgroundColor: ' #081D3C',
  border: 'solid #0094FF 2px',
  width: '90%'
}} className=" border-2 fs-5 pt-md-3 my-md-3 rounded-3 d-flex my-1">
            <p className="ms-md-2">Message ID :</p>
            <p className="me-md-5">1</p>
            <p className="ms-md-5">content :</p>
            <p className='text-white'>bomfbdofo</p>
        </div>);
    }
  