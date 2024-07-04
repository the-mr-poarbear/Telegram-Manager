import { Link } from 'react-router-dom';
import './LoginReg.css'
import { useRef } from 'react';
import axios from 'axios';

function LoginReg({CheckUser,inputs,title , other , func, errCode , mode='login'}){
    const refArr = []

    for(let i=0 ; i <inputs.length ; i++){
        console.log(i)
        refArr[i] = useRef('')
    }
    
  

    return <div className="formRegLog d-flex flex-column align-items-center">
        
        <h1 className='mb-5' style={{color:'#0094FF' }}>{title}</h1>
        <p className='text-danger'>{errCode}</p>
        {inputs.map((input , index) => {
            return <div  className="text-white row w-75 my-3 fs-3">
               <label className='col-3' for={input}>{input}</label>
               <div className='col-2'></div>
               <input className='inputArea col-7' ref={refArr[index]} onChange={(e , index)=>CheckUser(e.target.value , index ,mode)} id={input} ></input>
        </div> 
        })}

        <button className='w-75 mt-4 logregBtn' onClick={()=>func(refArr)}>{title}</button>
        <p className='mt-5 text-white'>{other.text}<Link style={{color:'0094FF'}} to={other.link}>{other.linkText}</Link></p>
    </div>
}

export default LoginReg;