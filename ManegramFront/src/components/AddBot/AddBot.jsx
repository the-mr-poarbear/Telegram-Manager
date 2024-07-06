import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'
import './AddBot.css'
import { useContext, useState } from 'react';
import { selectedProperty, Token } from '../../RoutesManeg';
import SearchableDropdown from '../SearchableDropDown/SeachableDropdown';
import axios from 'axios';

function AddBot(){
    const location = useLocation();
    // get userId
    let blanks = location.state.blanks;
    const [messageContainers , setMessageContainers] = useState([])
    const [container2bAdded , setContainer2bAdded] = useState([])
    const {selected , setSelected } = useContext(selectedProperty)
    const {token} = useContext(Token)
    function FetchContainers(){
        axios.get('http://127.0.0.1:8000/all-containers',{headers: {'Authorization': `bearer ${token}`} } ).then((response)=>{
            setMessageContainers(response.data.message_containers)
            console.log(response.data)
        })
    }
    return (
    <div className='w-100 d-flex flex-column align-items-center'>
        {console.log( 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')}
        
        <NavigationBar/>
        <div className='w-100 d-flex flex-column align-items-center ' style={{margin:'200px 0'}}>
            <div className='text-white px-3 w-100 my-5 addBot rounded'><h2 className='py-2'>Add Bot</h2></div>
            <div className="container d-flex flex-column form-control addBot py-5" style={{border:'none'}}>
                {blanks.map((blank)=>{
                    if(blank.type=='text') {
                            return <div className="d-flex justify-content-between row ">
                                <div className="col-2">&nbsp;</div>

                                <div className="col-8 d-flex justify-content-center ">
                                    

                                    <div className="col-1 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 col-3 p-0 d-none d-md-block ">{blank.title}</label>
                                    <div className="p-3 py-4 pe-5 blackDiv col-9">
                                        <input defaultValue='Name' className="form-control inputColor text-white w-50 " type="text"
                                            ></input>
                                    </div>
                                </div>

                                <div className="col-2">&nbsp;</div>
                            </div>
                        }
                        else if(blank.type=='dropDown'){
                            return  <div className="d-flex justify-content-between row row-cols-6 ">
                                    <div className="col-2">&nbsp;</div>
                                    <div className="col-8 d-flex justify-content-center row">
                                        <div className="col-2 d-none ">&nbsp;</div>
                                        <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block">{blank.title}</label>
                                        <div className="p-3 py-4 pe-5 d-flex  justify-content-between col-9 blackDiv">
                                            <div onFocus={FetchContainers} className="dropdown col-lg-6">
                                                <SearchableDropdown
                                                    options={messageContainers}
                                                    label="title"
                                                    id="container_id"
                                                    selectedVal={container2bAdded}
                                                    handleChange={(val) => setContainer2bAdded(val)}
                                                />
                                            </div>
                                            <button className="btn  px-md-5 addButton" type="submit">Add</button>
                                        </div>
                    
                    
                                    </div>
                                    <div className="col-2">&nbsp;</div>
                                </div>
                        }else if(blank.type=='addableText'){
                            return <div className="d-flex justify-content-between row row-cols-6 ">
                                <div className="col-2">&nbsp;</div>
                                <div className="col-8 d-flex justify-content-center row">
                                    <div className="col-2 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block">{blank.title}</label>
                                    <div className="p-3 py-4 pe-lg-5 pe-5  d-flex justify-content-between col-9 blackDiv">
                                        <input defaultValue='Add Admins' className="form-control text-white w-50 inputColor" type="text"
                                            ></input>
                                        <button className="btn  px-md-5 ms-md-5 addButton" type="submit">Add</button>

                                    </div>

                                </div>

                                <div className="col-2">&nbsp;</div>
                            </div>
                        } 

                        else if(blank.type=='textArea'){
                            return <div className="d-flex justify-content-between row row-cols-6 ">
                                <div className="col-2 ">&nbsp;</div>
                                <div className="col-8 d-flex justify-content-center row">
                                    <div className="col-2 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block ">{blank.title}</label>

                                    <div  className="p-3 py-4 pe-5  col-9 blackDiv">
                                        <textarea defaultValue='Info' className="form-control pb-5 w-100 addBotTextAra inputColor text-white" type="text text-white"
                                            > </textarea>
                                    </div>

                                </div>
                                <div className="col-2">&nbsp;</div>
                            </div>
                        }     
                })}
            
            </div>      
        </div>  
        <Footer/>
    </div>)  
    
}

export default AddBot;