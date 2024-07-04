import { Link } from 'react-router-dom';
import './PanelBody.css'
import XYChart from '../Charts/XYChart';




function PanelBody({topLeft , topMiddle , right , bottomLeft , bottomMiddle }){
    return <div className='row mt-5 mx-3'>
        <div className='col-lg-7 col-12'>
            <div className='core a'>
                {/* <h3>{topLeft.title}</h3>
                <p>{topLeft.content}</p> */}
            </div>

            <div className='core mt-3 d'>
                    <XYChart/>
                    <Link to='./'><button className='mx-5 mt-1 mb-3'>See More</button></Link>
            </div>
            </div>
        <div className='col-3'>
            <div className='core b'>
                {/* <h3>{topMiddle.title}</h3>
                <p>{topMiddle.content}</p>
                <Link to={topMiddle.Link}><button>See Messages</button></Link> */}
            </div>

            <div className='core e mt-3'>
                <textarea id="w3review" name="w3review" rows="4" cols="5"></textarea>
            </div>
        </div>
        <div className='col-2'>
            <div className='core c'>
                {/* {right.infos.map(info=>{
                    return <div>
                        <h3>{info.title}</h3>
                        <h3>{info.content}</h3>
                    </div>
                })} */}
            </div>
        </div>

        

        
    </div>
}

export default PanelBody;