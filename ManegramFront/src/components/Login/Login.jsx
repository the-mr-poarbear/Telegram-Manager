import LoginReg from "../LoginReg/LoginReg";
import './Login.css'
import logo from '../../assets/media/logo.png'
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ManagementPanel from "../ManagementPanel/ManagementPanel";
import { useNavigate } from "react-router-dom";
import { PropertyContext, Token } from "../../RoutesManeg";


function Login(){
    const [errCode , setErrCode] = useState('')
    const manage = useNavigate()
    const {properties , setProperties} = useContext(PropertyContext)
    const first = useRef(true)
    const {setToken} = useContext(Token)
    useEffect(()=>{
        console.log(first.current)
        if (first.current){
            first.current = false
        } else {
            console.log(properties , 'goh')
            manage('/managementPanel')
        }
        
      },[properties])

    function LoginCheck(refs){
        
        console.log(setProperties)
        const formData = new FormData()
        formData.append('username' , refs[0].current.value)
        formData.append('password' , refs[1].current.value)

        axios.post('http://127.0.0.1:8000/login',formData ).then((response) =>{
        
        if(response.status == 200){
            console.log(response.data.access_token)
            localStorage.setItem('accsess_token',response.data.access_token)
            setToken(localStorage.getItem('accsess_token'))
            axios.get('http://127.0.0.1:8000/admin-management-panel',{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
                console.log(response.data)
                setProperties(response.data)
                
                console.log(properties , 'khi')
            })
            
        }}).catch((err)=>( setErrCode('username or password is incorrect')
        ))
    }

    return <div  className=" d-flex flex-column align-items-center justify-content-center">
         <img className='mb-5' src={logo}></img>
         <LoginReg errCode={errCode} func={LoginCheck} inputs={['Username' , 'Password']} title={'Login'} other={{text:'dont have an account?',link:'/signup',linkText:' sign up'}} />
    </div> 
   
}

export default Login;
