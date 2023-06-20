import React, { createContext, useReducer } from 'react';

import './App.css';
import Navbar from './Components/Navbar';
import Content from './Components/Content';
import Services from './Components/Services';
import Footer from './Components/Footer';
import Team from './Components/Team';
import Login from './Pages/Login';
import Logout from './Components/Logout';
import Otp from './Components/Otp';
import Edit from './Pages/Edit';
import NotificationPopUp from './Components/NotificationPopUp';
import Donorlist from './Components/Donorlist';
import Registration from './Components/Registration';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import {Routes,Route, useParams} from 'react-router-dom';
import { initialState, reducer} from "./reducer/UseReducer";


import Dashboard from './Components/Dashboard';
import NearByUsers from './Components/NearByUsers';

export const UserContext = createContext();
const Routing = () =>{
  
  const {id}=useParams();
  

  return (
    <>
    <div>
      <Navbar/>
      
      <Routes>
        <Route exact path='/' element={ 
          <>
          <Content />
          {/* <Services /> */}
          <Team />
          <Footer/>
          </>
          }>

          </Route>
        <Route path='/login' element={
          <>
           <Login />
           <Footer/>
          </>
        }>

        </Route>
        <Route path='/dashboard' element={
          <>
           <Dashboard />
           {/* <Footer /> */}
          </>
        }>

        </Route>
       
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='/otp' element={<Otp />}></Route>
        <Route path='/donor_list' element={<NotificationPopUp />}></Route>
        
        <Route path='/list' element={<Donorlist />}></Route>
        <Route path='/nearby_users' element={<NearByUsers />}></Route>
       
      </Routes>
      
   
    </div>
    </>
  );
}
const App=()=> {
  
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    {/* <Navbar /> */}
    <Routing />
      
      </UserContext.Provider>
    </>
  );
}

export default App;
