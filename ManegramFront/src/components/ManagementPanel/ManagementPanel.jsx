import { useState } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import PanelBody from '../PanelBody/PanelBody';
import'./ManagementPanel.css'
import SidePanelProfile from '../SidePanelProfile/SidePanelProfile';


function ManagementPanel({messageConts , commentConts , bots}){
    const [selected , setSelected] = useState([messageConts[0],'0'])

    return <div className='d-flex flex-column align-items-center'>
        {console.log(selected)}
        <NavigationBar/>
       

        <div className='row text-white wholeThing d-flex justify-content-center'>
       
            <div className='col-3 d-none d-lg-block'><div className='shell'><h2 className='p-2 mb-0 ps-3'>Items</h2></div></div>
            <div className='col-lg-9 col-12 p-0 mb-3'><div className='shell'><h2 className='p-2 ps-5'>SAKA</h2></div></div>
            <SidePanelProfile keys={messageConts}/>
            <div className='col-3 d-none d-lg-block'>
                <div className='shell long'>
                    
                    <ul className=' p-0 '>
                        <li className='mb-3'>
                            <button type="button" className="btn text-white mt-5" data-bs-toggle="collapse" data-bs-target="#demo"><h5>Message Containers</h5></button>
                            <div id="demo" className="collapse ">
                                <ul className=''>
                                    {messageConts.map((messageCont)=>{
                                        return <li onClick={(event)=> setSelected([messageCont,0])} className='my-4 panelOP'>{messageCont.name}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>

                        <li className='mb-3'>  
                            <button type="button" className="btn text-white" data-bs-toggle="collapse" data-bs-target="#demo1"><h5>Comment Containers</h5></button>
                            <div id="demo1" className="collapse ">
                                <ul>
                                    {commentConts.map((commentCont)=>{
                                        return <li onClick={(event)=> setSelected([commentCont,0])} className='my-4'>{commentCont.name}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>

                        <li>
                        <button type="button" className="btn text-white" data-bs-toggle="collapse" data-bs-target="#demo2"><h5>Bots</h5></button>
                            <div id="demo2" className="collapse ">
                                <ul>
                                    {bots.map((bot)=>{
                                        return <li onClick={(event)=> setSelected([bot,1])} className='my-4'>{bot.name}</li>
                                    })}
                                    
                                </ul>
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='col-lg-9 col-12 row'>
                <div className='shell long'>
                    {selected[1]==0 ? (
                        <PanelBody property={selected }/>  
                    ) : (
                        <PanelBody property={selected }/>  
                    )}
                       
                    
                </div>
                
            </div>
        </div>
    </div>
}

export default ManagementPanel;