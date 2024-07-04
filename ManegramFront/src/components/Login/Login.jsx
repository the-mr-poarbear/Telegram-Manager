import LoginReg from "../LoginReg/LoginReg";
import './Login.css'
import logo from '../../assets/media/logo.png'
import axios from "axios";
import { useState } from "react";

function Login(){
    localStorage.setItem('gi','ann')
    const [errCode , setErrCode] = useState('')
    function LoginCheck(refs){
        const formData = new FormData()
        formData.append('username' , refs[0].current.value)
        formData.append('password' , refs[1].current.value)

        axios.post('https://ziwtl4x9uc.loclx.io/login',formData ).then((response) =>{console.log(response)}).catch((err)=>( setErrCode('username or password is incorrect')
        ))
    }

    return <div  className=" d-flex flex-column align-items-center justify-content-center">
         <img className='mb-5' src={logo}></img>
         <LoginReg errCode={errCode} func={LoginCheck} inputs={['Username' , 'Password']} title={'Login'} other={{text:'dont have an account?',link:'/signup',linkText:' sign up'}} />
    </div> 
   
}

export default Login;
