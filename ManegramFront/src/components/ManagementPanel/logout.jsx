import { useNavigate } from 'react-router-dom';
import './logout.css'
import { useContext } from 'react';
import { Profile } from '../../RoutesManeg';

function Logout(){
    const manage = useNavigate()
    const {setProf} = useContext(Profile)
    return (
        <div class=" d-flex justify-content-center align-items-center">


    <div id="card" class="carddd card container w-25  p-5">



        <div class="blueee">
            <p class="fs-4">you can log out from here</p>
        </div>
        <div class="text-white d-flex justify-content-between mt-4">
            
            <p class="blueee fs-5"></p>
        </div>
        <div class="text-white d-flex justify-content-between">
            
            <p class="blueee fs-5"></p>
        </div>
        <div class="text-white d-flex justify-content-between">
           
            <p class="blueee fs-5"></p>
        </div>

        <button onClick={()=> {localStorage.removeItem('accsess_token') ; localStorage.removeItem('accsess_token_super') ; manage('/') ; setProf({link: '/login' , text: 'Login/Signin'})}} class="btn border-primary blueee mt-4">Log out</button>

    </div>

</div>
    )
}

export default Logout;