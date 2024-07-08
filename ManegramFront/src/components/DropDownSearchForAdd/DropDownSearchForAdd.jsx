import React, { useContext, useEffect, useRef, useState } from "react";
import SearchableDropdown from "../SearchableDropDown/SeachableDropdown";
import { selectedThing } from "../AddBot/AddBot";
export function DropDownSearchForAdd({
  FetchContainers,
  messageContainers,
  container2bAdded,
  title,
  setContainer2bAdded,
  selectedMesConts,
  setSelectedMesConts,
  reff
}) {

  const {refresh , setRefresh} = useContext(selectedThing)

  let count = useRef(0)


  function AddMesssageContainer(){
    console.log(container2bAdded,'cc')
    if (container2bAdded){
        console.log(count)
        let temp = selectedMesConts
        temp.push(container2bAdded)
        setSelectedMesConts(temp)
        console.log(temp , 'temp')
    }  

    }

    useEffect(()=>{
        console.log('giiiii' , count)
    },[ count])

  

  return <div className="d-flex justify-content-between row row-cols-6 ">
           
            <div className="col-2">&nbsp;</div>
                <div className="col-8 d-flex justify-content-center row">
                    <div className="col-2 d-none ">&nbsp;</div>
                        <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block">{title}</label>
                            <div className="p-3 py-4 pe-5 col-9 blackDiv">
                                <div className="d-flex  justify-content-between w-100">
                                    <div onFocus={FetchContainers} className="dropdown col-lg-6">
                                        <SearchableDropdown inputRef={reff} options={messageContainers} label="title" id="container_id" selectedVal={container2bAdded} handleChange={val => setContainer2bAdded(val)} />
                                    </div>
                                    <button onClick={()=>{AddMesssageContainer(); count.current++;setRefresh(count.current); }} className="btn  px-md-5 addButton" type="submit">Add</button>
                                </div>
                                
                                <div className="d-flex flex-wrap mt-4">
                                    {selectedMesConts.map((conts)=>{
                                           
                                            return  <div style={{backgroundColor:'#11428C'}} className='text-white w-25 py-2 m-1 text-center fs-6 rounded-3'>{String(conts)}</div>
                                    })}
                                </div>
                                

                            </div>
                    
                    
                    </div>
            <div className="col-2">&nbsp;</div>
        </div>
}
  