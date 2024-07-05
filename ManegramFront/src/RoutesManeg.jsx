import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';
import ViewContMessages from './components/ViewContMessages/ViewContMessages';
import PanelBody from './components/PanelBody/PanelBody';
import PanelBodyBot from './components/PanelBodyBot/PanelBodyBot';



export const Token = React.createContext();
export const PropertyContext = React.createContext();



function RoutesManeg() {
const [token , setToken] = useState({})
  let [properties , setProperties] = useState({gi:'ann'})
  
  
  return (
  
    <Token.Provider value={{token , setToken}}>
    <PropertyContext.Provider value={{properties: properties , setProperties: setProperties}}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/managementPanel" element={<ManagementPanel/>}>
            <Route exact path="/managementPanel/cont-message/:container_id" element={<ViewContMessages/>} />
            <Route exact path="/managementPanel/panel" element={<PanelBody/>} />
            <Route exact path="/managementPanel/panelBot" element={<PanelBodyBot/>} />
          </Route>                    

          {//property.messageCont
          
          }
        </Routes>
        
      </Router>
    </PropertyContext.Provider>
    </Token.Provider>
  );
}

export default RoutesManeg;
