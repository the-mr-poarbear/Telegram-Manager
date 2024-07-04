import React from "react";
import { Link } from 'react-router-dom';

function Nav({NavOps}){

    return <div>
            <ul className="d-flex ">
                {NavOps.map((NavOp)=> <li className="mx-3 fs-3"><a href={NavOp.link}>{NavOp.name}</a></li>)}

            </ul>
       </div>
    
    
}

export default Nav;