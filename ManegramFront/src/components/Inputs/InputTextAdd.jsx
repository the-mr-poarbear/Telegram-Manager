import axios from "axios";
import React, { useRef, useState } from "react";
 function InputTextAdd({title ,setSelectedAdmins , selectedAdmins , edit=false , ent_id}) {
    const reff = useRef('')
    const [errCode , setErrCode] = useState('')

    function Found(selectedAdmin){
        console.log(selectedAdmin , 'selll')
        if(!edit){
            axios.get( 'http://127.0.0.1:8000/registerAuthentication/'+selectedAdmin).then((response)=>{
                console.log(response.data)
                if(!response.data){
                    setErrCode('')
                    return true
                    
                }else{
                    setErrCode('admin wasnt found')
                }
            })
        } else if (edit){
            axios.get( `http://127.0.0.1:8000/admin-username-authentication/edit/0/${selectedAdmin}&${ent_id}` ,{headers: {'Authorization': `bearer ${localStorage.getItem('accsess_token')}`} } ).then((response)=>{
                console.log(response.data,'brr')
                if(response.data){
                    setErrCode('')
                    return true
                    
                }else{
                    setErrCode('admin wasnt found or was already added')
                }
            })
        }
        

        
    }

    function AddAdmin(){
        if(!selectedAdmins.includes(reff.current.value) && !Found(reff.current.value)){
            let temp = selectedAdmins
            temp.push(reff.current.value)
            setSelectedAdmins(temp)
            console.log(temp , 'temper')
        }
        
    }  
    

    return <div className="d-flex justify-content-between row row-cols-6 ">
                                <div className="col-2">&nbsp;</div>
                                <div className="col-8 d-flex justify-content-center row">
                                    <div className="col-2 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block">{title}</label>
                                    <div className="p-3 py-4 pe-lg-5 pe-5 col-9 blackDiv">
                                        
                                        <div className=" d-flex justify-content-between ">
                                            <input ref={reff} defaultValue='Add Admins' className="form-control text-white w-50 inputColor" type="text"></input>
                                            <button onClick={AddAdmin}  className="btn  px-md-5 ms-md-5 addButton" type="submit">Add</button>
                                        </div>
                                        <p className="text-danger">{errCode}</p>

                                    </div>

                                </div>

                                <div className="col-2">&nbsp;</div>
                            </div>;
}
  
export default InputTextAdd;