import './Footer.css'

function Footer(){
    return <div className='w-100'>

    <div className='d-flex row CallBar w-100 px-5 py-3 justify-content-around align-items-center'>
        <div className='d-flex align-items-center col-md-6 col-12'>
          <i className='bi-envelope-fill iconFooter me-4'></i>
          <h3>Email Address : bimarestan@gmail.com</h3>
        </div>

        <div className='d-flex align-items-center col-md-6 col-12'>
          <i className='bi bi-telephone-fill iconFooter me-4'></i>
          <h3>Phone Number : 33029302</h3>
        </div>
    </div>

    <footer className="footerHome container-fluid px-5 w-100 text-white" >
      <div className="row d-flex justify-content-around pt-5">

        <div className="col-lg-4 col-sm-5 col-12 my-3" >
          <h3 ><i className="bi bi-rocket-takeoff mb-5"></i></h3>
          <ul>
            <li><a href="#"><p>hi idk what to write here but lorem seemed kind of unfinished uk..so ya</p></a></li>
            <li><a href="#"><p>Lorem!</p></a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-sm-5 col-12 my-3">
          <h5>About us</h5>
          <ul>
            <li><a href="#"><p>Zeux</p></a></li>
            <li><a href="#"><p>Portfolio</p></a></li>
            <li><a href="#"><p>Careers</p></a></li>
            <li><a href="#"><p>Contact us</p></a></li>
          </ul>
        </div>

        <div className="col-lg col-12 my-3">
          <h5>Contact us</h5>
          <ul>
            <li><a href="#"><p>you can contact us via phone number or social networks</p></a></li>
            <li><a href="#"><p>0936405206</p></a></li>
          </ul>
        </div>


        <div className="col-lg  col-12 my-3">
          <h5>Follow us</h5>
          <div className="">
            <a href="#"><i className="bi bi-facebook mx-2 fs-2"></i></a>
            <a href="#"><i className="bi bi-instagram mx-2 fs-2"></i></a>
            <a href="#"><i className="bi bi-twitter mx-2 fs-2"></i></a>
            <a href="#"><i className="bi bi-linkedin mx-2 fs-2"></i></a>
          </div>
        </div>

      </div>
      </footer>
</div>
    
}

export default Footer;