import React from "react";
function InputText({title ,reff , checkBox=false , check}) {
  return <div className="d-flex justify-content-between row ">
                    <div className="col-2">&nbsp;</div>

                    <div className="col-8 d-flex justify-content-center ">
                                    
                    
                    <div className="col-1 d-none ">&nbsp;</div>
                    <label for="title" className="text-white mt-md-3 col-3 p-0 d-none d-md-block ">{title}</label>
                        <div className="p-3 py-4 d-flex text-white pe-5 blackDiv col-9">
                            <input ref={reff}  defaultValue={title} className="form-control inputColor text-white w-50 " type="text"></input>
                            {checkBox && < div className="ms-3">
                                <input className="m-1" onClick={(e)=>{check.current = e.target.value; console.log(check.current)}}  type="radio" id="html" name="fav_language" value="2"></input>
                                <label className="m-1"  for="html">Comment</label>
                                <input className="m-1" onClick={(e)=>{check.current = e.target.value}} type="radio" id="css" name="fav_language" value="1"></input>
                                <label className="m-1"  for="css">Message</label>
                                </div>
                            }
                            
                        </div>
                    </div>

                    <div className="col-2">&nbsp;</div>
                </div>;
}

export default InputText;
  