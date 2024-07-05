import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { popupPass } from '../../RoutesHos'





function PopUpView({user}) {
   const {modal , setModal} = useContext(popupPass)
   let keys = ['firstname','lastname','Speciaity','Degree']

   useEffect(() => {
    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [modal]);
  
 

  return <div className="">
          {console.log(modal)}
          
  
    {modal &&(<div className="modall">
      <div  className="overlay" onClick={()=>{setModal(false)}}></div>
      <div className="modal-content">
       
          {keys.map((key) => (
                <p key={key}>{key} : {user[key]}</p>
          ))}

        <button className="close-modal" onClick={()=>{setModal(false)}} >
          CLOSE
        </button>
      </div>
    </div>)}
  
      </div>
  
}
export default PopUpView;
