function SendMessageButton({container , onClick}){
    return <>
        {console.log(container , 'container in ')}
        <button onClick={()=>onClick(container.container_id)} style={{color: '#0094FF', backgroundColor:' #081D3C',width:'85%' , border: 'solid #0094FF 2px' , borderRadius:'10px'}} type="button"
            className="btn border-2 button py-md-1 mt-md-4 fw-bolder d-flex justify-content-between text-center rounded-3 fs-4 mt-1"><p></p><p className='m-0'>{container.title}</p> <i class="bi bi-caret-right"></i></button>
    </>
}

export default SendMessageButton