import React from "react";
import './idx.css'
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import Footer from '../Footer';




export default function Dashsidebar(){
  const history = useNavigate();
  const [userData, setUserData] = useState([]);

  const [date1, setdate1] = useState('');
    const calldashboardPage = async () => {
        try {
          const res = await fetch('/about', {
            method: "GET",
            headers: {
              Accept:"application/json",
              "Content-Type": "application/json"
            },
            credentials:"include"
          });
      
          const data = await res.json();
          setUserData(data);
         console.log(data.date);
        //  let date = data.date.toISOString().substring(0, 10);
        //  setdate1(date);
          const date_obj = new Date(data.date);
          setdate1(date_obj.toISOString().substring(0, 10));
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
      
      
        } catch (err) {
          console.log(err);
          history ('/login');
        }
      } 
    useEffect(() => {
        calldashboardPage()
      }, []);
      
    
    return(
      <>
        <div className="Dashsidebar">
        <div className="sidebarWrapper">
         <div className="sidebarMenu">
          <form method="GET">
          <div className='dashlogo'>
            <img src={`/uploads/${userData.photo}`} alt='' />
          </div>
          <h1 className="sidebarTitle">{userData.b}</h1>
          <ul className="sidebarList">
            {/* <Link to="/" className="link"> */}
            <li className="sidebarListItem">
              
              {userData.name}
            </li>
            {/* </Link> */}
            <li className="sidebarListItem">
              
              {userData.address} {userData.district + " " +userData.pincode}
            
              
            </li>
            <li className="sidebarListItem">
              Blood Group:{userData.blood_group} <br />
              age: {userData.age}
              
              
            </li>

            <li className="sidebarListItem">
              
            Last Donate:  {date1} 
            
              
            </li>

            <li className="sidebarListItem">
              <FaEdit />  
              <NavLink className="nav-link" to={`/edit/${userData._id}`}>Edit</NavLink>
            </li>
            <li className="sidebarListItem">
            <FaSignOutAlt />
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>

          </ul>
            </form>
        </div>
        </div>

      </div>
     
      </>
    );
}