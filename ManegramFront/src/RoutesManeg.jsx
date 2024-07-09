import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import ViewContMessages from './components/ViewContMessages/ViewContMessages';
import PanelBody from './components/PanelBody/PanelBody';
import PanelBodyBot from './components/PanelBodyBot/PanelBodyBot';
import AddBot from './components/AddBot/AddBot';
import ViewBotMessages from './components/ViewBorMessages/ViewBotMessages';
import SendMessage from './components/SendMessage/SendMessage';
import AddContainer from './components/AddContainer/AddContainer';
import BigGraphCont from './components/BigGraph/BigGraphCont';
import ViewFiltered from './components/ViewFiltered/ViewFiltered';
import BigGraphBot from './components/BigGraph/BigGraphBot';
import EditBot from './components/EditBot/EditBot';
import SuperAdminLogin from './components/SuperAdmin/SuperAdminLogin';
import SuperAdminPanel from './components/SuperAdmin/SuperAdminPanel';
import ContactUs from './components/ContactUs/ContactUs';
import SuperAdminContPanel from './components/SuperAdmin/SuperAdminContPanel';
import SuperAdminBotPanel from './components/SuperAdmin/SuperAdminBotPanel';
import Logout from './components/ManagementPanel/logout';



export const Token = React.createContext();
export const PropertyContext = React.createContext();
export const selectedProperty = React.createContext();
export const selectedBotProp = React.createContext();
export const Profile = React.createContext() 

function RoutesManeg() {
const [prof , setProf] = useState({link: '/login' , text: 'Login/Signin'})
const [token , setToken] = useState({})
let [properties , setProperties] = useState({gi:'ann'})
const [selected , setSelected] = useState({title:'Container or Bot Name'})
  
  
  return (
  
    <Token.Provider value={{token , setToken}}>
    <selectedProperty.Provider value={{selected , setSelected}}>
    <PropertyContext.Provider value={{properties: properties , setProperties: setProperties}}>
    <Profile.Provider value={{prof , setProf}}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/managementPanel" element={<ManagementPanel/>}>
            <Route exact path="/managementPanel/cont-message/:container_id" element={<ViewContMessages/>} />
            <Route exact path="/managementPanel/bot-message/:bot_id" element={<ViewBotMessages/>} />
            <Route exact path="/managementPanel/panel" element={<PanelBody/>} />
            <Route exact path="/managementPanel/panelBot" element={<PanelBodyBot/>} />
            <Route exact path="/managementPanel/sendMessage" element={<SendMessage/>} />
            <Route exact path="/managementPanel/BigGraphCont" element={<BigGraphCont/>} />
            <Route exact path='/managementPanel/BigGraphBot' element={<BigGraphBot/>} />
            <Route exact path="/managementPanel/view-filtered" element={<ViewFiltered/>} /> 
          </Route>   
            <Route exact path="/addBot" element={<AddBot/>} /> 
            <Route exact path="/add-container" element={<AddContainer/>} /> 
            <Route exact path="/editBot" element={<EditBot/>} /> 
            
            
          <Route exact path="/super-admin-login-saka" element={<SuperAdminLogin/>} />  

          <Route exact path="/superadmin/managementPanel" element={<SuperAdminPanel/>}> 
              <Route exact path="/superadmin/managementPanel/contPanel" element={<SuperAdminContPanel/>} />
              <Route exact path="/superadmin/managementPanel/botPanel" element={<SuperAdminBotPanel/>} />
          </Route>

          

          <Route exact path="/ContactUs" element={<ContactUs/>} />   
          <Route exact path="/logout" element={<Logout/>} />   
          
          
        </Routes>
        
      </Router>
      </Profile.Provider>
    </PropertyContext.Provider>
    </selectedProperty.Provider>
    </Token.Provider>
    
  );
}

export default RoutesManeg;
