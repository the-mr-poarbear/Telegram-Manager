import React from "react";
function InputText({title ,reff}) {
  return <div className="d-flex justify-content-between row ">
                    <div className="col-2">&nbsp;</div>

                    <div className="col-8 d-flex justify-content-center ">
                                    
                    
                    <div className="col-1 d-none ">&nbsp;</div>
                    <label for="title" className="text-white mt-md-3 col-3 p-0 d-none d-md-block ">{title}</label>
                        <div className="p-3 py-4 pe-5 blackDiv col-9">
                            <input ref={reff}  defaultValue={title} className="form-control inputColor text-white w-50 " type="text"></input>
                        </div>
                    </div>

                    <div className="col-2">&nbsp;</div>
                </div>;
}

export default InputText;
  