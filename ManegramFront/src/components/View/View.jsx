import { useContext, useEffect, useState } from "react";
import "./View.css";
import { Link } from "react-router-dom";
import useWindowDimensions from "../Hooks/useWindowDimensions";

function View({ keys, title, users, btn }) {
  const [index, setIndex] = useState(5);
  let keysSlized = keys.slice(0, index);

  const { height, width } = useWindowDimensions();
  const [value, setValue] = useState("Spechailty");

  return (<div className="d-flex flex-column align-items-center w-100">
   <h2 className="mb-5 text-white">{title}</h2>
    <div className="widthAdjust p-4 viewBody d-flex flex-column align-items-center">
      <div className="d-flex w-100 justify-content-between">
       
      </div>

      {width <= 600 && index == 5 ? setIndex(4) : null}
      {width > 600 && index == 4 ? setIndex(5) : null}

      <div className="containerRows">
        {console.log(users)}
        {users.map((user , index) => {
          return (
            <div className=" row  viewRow text-white mb-3">
              <div className="col-12 col-md-10 d-flex">
                {keysSlized.map((key) => (
                  <div key={key} className="col fontSizeView">
                    {key == "message_content" || key == "content" ? (
                      <p></p>
                    ) : (
                      <div>
                        <p className="w-100  ">{key}</p>
                        <p className="w-100 ">{user[key]}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <button
                    className=" messageButton"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${index}`}
                    aria-expanded="false"
                    aria-controls={`#${index}`}
                  >
                    <i class="bi bi-caret-up"></i>
                  </button>
                </div>
              </div>
              <div className="collapse col-12" id={index}>
                <div className="card card-body messageContent">
                  {user[keysSlized[keysSlized.length-1]]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
    
  );
}

export default View;
