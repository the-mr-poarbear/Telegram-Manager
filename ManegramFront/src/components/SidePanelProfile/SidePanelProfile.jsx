import { Offcanvas } from "react-bootstrap";

import { useContext, useState } from "react";
import lockCl from '../../assets/media/lock close.png'

import './SidePanelProfile.css'

function SidePanelProfile({keys}){
    keys = [1 , 2, 3,  4, 5]
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
        <Offcanvas.Title>hbhybjhbyh</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        
            {keys.map((key) => (
                <p key={key}>{key} : </p>
            ))}
        
        </Offcanvas.Body>
    </Offcanvas>

    </div>

       
}

export default SidePanelProfile;