import LoginReg from "../LoginReg/LoginReg";
import './SignUp.css'
import logo from '../../assets/media/logo.png'
import axios from "axios";
import { useState } from "react";

function SignUp(){
    const [errCode , setErrCode] = useState('')

    function CheckUser(username , mode){
        
        if(mode != 'login'){
            console.log(username)
           
            axios.get( 'http://127.0.0.1:8000/registerAuthentication/'+username).then((response)=>{
                console.log(response.data)
                if(!response.data){
                    
                    setErrCode('this username is already taken')
                }else{
                    setErrCode('')
                }
            })
        }
    }

    function RegisterCheck(refs){

        axios.post('http:/127.0.0.1:8000/register',{username : refs[0].current.value ,password : refs[1].current.value ,firstname : refs[2].current.value ,lastname : refs[3].current.value , } ).then((response) =>{console.log(response)})  
    }

    return <div  className=" d-flex flex-column align-items-center justify-content-center">
         <img className='mb-5' src={logo}></img>
         <LoginReg errCode={errCode} mode={'signup'} CheckUser={CheckUser}  func={RegisterCheck} inputs={['Username' , 'Password','Firstname' , 'Lastname']} title={'Sign up'} other={{text:'already have an account?',link:'/Login',linkText:' Login'}} />
         
    </div> 
   
}

export default SignUp;
