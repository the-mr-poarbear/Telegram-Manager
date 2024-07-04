import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ManagementPanel from './components/ManagementPanel/ManagementPanel';



export const UserContext = React.createContext();
export const PropertyContext = React.createContext();

function RoutesManeg() {
  const [user , setUser] = useState({})
  const [property , setProperty] = useState({})

  return (
    <UserContext.Provider value={{user , setUser}}>
    <PropertyContext.Provider value={{property , setProperty}}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/managementPanel" element={<ManagementPanel  messageConts={[{name:'SAKA'} ,{name:'MMD'} , {name:'gi'}]}  commentConts={[{name:'sth'} ,{name:'comm'} , {name:'nth'}]} bots={[{name:'Music bot'} ,{name:'bip bip'} , {name:'someone sth'}]}/>} />
          {//property.messageCont
          }
        </Routes>
        
      </Router>
    </PropertyContext.Provider>
    </UserContext.Provider>
  );
}

export default RoutesManeg;
