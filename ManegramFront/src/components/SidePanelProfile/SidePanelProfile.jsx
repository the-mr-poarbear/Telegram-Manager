import { Offcanvas } from "react-bootstrap";

import { useContext, useState } from "react";
import lockCl from '../../assets/media/lock close.png'

import './SidePanelProfile.css'

function SidePanelProfile({keys , keys2 , keys3}){
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return <div>
        <div onClick={handleShow} className='d-flex collappsedProf text-black d-block d-lg-none'>
        <img src={lockCl} className='collappsedPP'></img>
        <h2 className='d-flex align-self-center'></h2>
        </div>
    
        
        <Offcanvas  show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title><h2>Items</h2></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
            <h3 className="mb-2">Message Containers</h3>
            {keys?.map((key) => (
                <h4 key={key.title}>{key.title} </h4>
            ))}

            <h3 className="mt-5 mb-2">Comment Containers</h3>
            {keys2?.map((key) => (
                <h4 key={key.title}>{key.title}  </h4>
            ))}

            <h3 className="mt-5 mb-2">Bots</h3>
            {keys3?.map((key) => (
                <h4 key={key.title}>{key.title} </h4>
            ))}
        
        </Offcanvas.Body>
    </Offcanvas>

    </div>

       
}

export default SidePanelProfile;