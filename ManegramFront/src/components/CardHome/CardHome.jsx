import './CardHome.css'

function CardHome({title , body}){
    return <div className='d-flex text-center text-white flex-column align-items-center justify-content-evenly body col-3'>
        <h2 className='fs-3'>{title}</h2>
        <p className='mt-4 px-5 fs-4'>{body}</p>
    </div>
}

export default CardHome;