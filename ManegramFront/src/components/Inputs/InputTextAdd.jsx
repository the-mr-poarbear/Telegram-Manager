import React from "react";
 function InputTextAdd({title}) {
  return <div className="d-flex justify-content-between row row-cols-6 ">
                                <div className="col-2">&nbsp;</div>
                                <div className="col-8 d-flex justify-content-center row">
                                    <div className="col-2 d-none ">&nbsp;</div>
                                    <label for="title" className="text-white mt-md-3 p-0 col-3 d-none d-md-block">{title}</label>
                                    <div className="p-3 py-4 pe-lg-5 pe-5  d-flex justify-content-between col-9 blackDiv">
                                        <input defaultValue='Add Admins' className="form-control text-white w-50 inputColor" type="text"></input>
                                        <button  className="btn  px-md-5 ms-md-5 addButton" type="submit">Add</button>

                                    </div>

                                </div>

                                <div className="col-2">&nbsp;</div>
                            </div>;
}
  
export default InputTextAdd;