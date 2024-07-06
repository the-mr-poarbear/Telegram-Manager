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



export const Token = React.createContext();
export const PropertyContext = React.createContext();
export const selectedProperty = React.createContext();
export const selectedBotProp = React.createContext();


function RoutesManeg() {
const [token , setToken] = useState({})
let [properties , setProperties] = useState({gi:'ann'})
const [selected , setSelected] = useState({title:'Container or Bot Name'})
  
  
  return (
  
    <Token.Provider value={{token , setToken}}>
    <selectedProperty.Provider value={{selected , setSelected}}>
    <PropertyContext.Provider value={{properties: properties , setProperties: setProperties}}>
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
          </Route>   
            <Route exact path="/addBot" element={<AddBot/>} /> 
          
                         

          {//property.messageCont
          
          }
        </Routes>
        
      </Router>
    </PropertyContext.Provider>
    </selectedProperty.Provider>
    </Token.Provider>
  );
}

export default RoutesManeg;
