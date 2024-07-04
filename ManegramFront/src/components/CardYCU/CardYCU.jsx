import './CardYCU.css'   

function CardYCU({icon , title}){
    return <div class="card bg-dark text-white text-center d-flex p-0 flex-column align-items-center justify-content-between col-3 bodyYCU">
    <img src={icon} class="card-img imgYcu" alt="..."></img>
    <div class="card-img-overlay">
    <h5 class="card-title fs-2">{title}</h5>
    <p class="card-text fs-5">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text">Last updated 3 mins ago</p>
    </div>
    </div>
}

export default CardYCU