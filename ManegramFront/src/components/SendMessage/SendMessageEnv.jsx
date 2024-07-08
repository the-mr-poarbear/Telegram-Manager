import React, { useContext, useState } from "react"
import './SendMessage.css'
import { selectedProperty, Token } from "../../RoutesManeg"
import axios from "axios"


function SendMessageEnv({message}) {
const {selected} = useContext(selectedProperty)
const {token} = useContext(Token)
const [success , setSuccess] = useState('')

function SendMessage(message_id){
    axios.post('http://127.0.0.1:8000/send-messsage',{bot_id : selected.bot_id  ,message_id : message_id } ,  {headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response) =>
    {console.log(response); setSuccess(true)})  
}

  return <div style={{
    color: '#0094FF',
    backgroundColor: ' #081D3C',
    border: 'solid #0094FF 2px',
    width: '90%'
  }} className=" border-2 fs-5  my-md-3 rounded-3  my-1">
                <div className="my-auto d-flex">
                    <div className="col d-flex align-items-center fontSizeView">
                        <div className=" ms-3 d-flex w-100 fs-5">
                            <p className="w-100 me-2 ">Message ID</p>
                            <p className="w-100 ">{message.message_id}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-center my-auto">
                    <button
                        className=" messageButton "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${message.message_id}`}
                        aria-expanded="false"
                        aria-controls={`#${message.message_id}`}
                    >
                    <i style={{color:"#0094FF"}} class="bi bi-caret-up "></i>
                    </button>
                    
                    </div>
                </div>

                <div className="collapse col-12" id={message.message_id}>
                    <div className="card card-body messageContent text-white">
                    {message.message_content}
                    </div>
                    { success == true ? <p className="text-success mx-3">message was sent</p> :  <p></p>}
                    <button onClick={()=>SendMessage(message.message_id )} className="m-3 sendButton">Send</button>
                </div>
                
        </div>
}


export default SendMessageEnv;
  