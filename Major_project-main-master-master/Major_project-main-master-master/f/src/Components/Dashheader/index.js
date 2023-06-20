import React from "react";
import './idx.css';
import { AiFillMessage } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import {useEffect, useState} from "react";
import NotificationPopUp from '../NotificationPopUp';
import { Link } from 'react-router-dom';
export default function Dashheader(){
  const [users, setUsers] = useState();
  const fetchUsers=async()=> {
    
    const res=await fetch('/show_noti',{
      method:"GET",
      headers: {
        Accept:"application/json",
        "Content-Type": "application/json"
      },
      credentials:"include"
    });
    const data = await res.json();
  setUsers(data.data);
}

  useEffect(() => {
    fetchUsers();
}, [])

const [user, setUser] = useState({
  email: ""
});
const [showButton, setShowButton] = useState(false);
let name, value;
  // function handleInputs ()  {
  //   // console.log(e);
  //   // name = e.target.name;
  //   // value = e.target.value;
    
  //   // setUser(args);
     

  // }
// console.log(users);
const clear = async(e) => {

  setUser(e);
  
  console.log(e);
  const res = await fetch("/clear_noti", {
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
    e
    })
  });
  const data = await res.json();
}

    return(
        <div className="Dashheader">
    <div class="dropup">
  <button id="searchButton" className="btn-btn"><Link style={{textDecoration: 'none', color:'#ffff'} } to='/donor_list'>Notifications</Link></button>
  
</div>
      </div>
    );
}