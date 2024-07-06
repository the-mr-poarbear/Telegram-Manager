import './OptionButton.css'
import { Link } from 'react-router-dom'

function OptionButton({title , link , ratio="1/1" ,  }){
    return <button style={{aspectRatio: ratio}} className='options d-flex  flex-column justify-content-center align-items-center p-2'>
            <Link className='' to={link}>
            <h2>{title}</h2></Link>
        </button>

}

export default OptionButton;