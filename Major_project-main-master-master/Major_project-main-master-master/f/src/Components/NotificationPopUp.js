import React, { useState, useEffect } from 'react';
import './NotificationPopUp.css'; // Import CSS file for styling
import {useNavigate} from 'react-router-dom';

const NotificationPopUp = (props) => {
  console.log(props);
  const [notifications, setNotifications] = useState([]);
  const history=useNavigate();


  const accept = async(e) => {

    console.log(e);
    const res = await fetch("/accept_noti", {
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
    setNotifications(data.data);
}


const clear = async(e) => {

 
  
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


   const handleAccept = (item) => {
     // Handle accept button logic here
     let filteredArr = notifications.filter((el) => el !== item);
     setNotifications(filteredArr);
      accept(item.email);
     
    //  setNotifications(false);
   };

   const handleReject = (item) => {
     // Handle reject button logic here
     let filteredArr = notifications.filter((el) => el !== item);
     setNotifications(filteredArr);
    //  console.log(item.email);
    clear(item.email);
};

  useEffect(() => {
    fetchUsers();
    // Simulated API call to fetch notifications
    const fetchNotifications = () => {
      // Replace this with your actual API call to fetch notifications
      const mockNotifications = [
        { id: 1, title: 'Notification 1', content: 'Notification 1 content' },
        { id: 2, title: 'Notification 2', content: 'Notification 2 content' },
        { id: 3, title: 'Notification 3', content: 'Notification 3 content' }
      ];

      setNotifications(mockNotifications);
    };
  
    fetchNotifications();
  }, []);

  return (
    <div>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <div className='notification-popup'>
            <center><h3>Notification Title</h3></center>
            <div>
               <label>Name: {notification.name}</label>
               {/* <Input onChange={(e)=>handleInput(e)} name='name' value={user.name}/> */}
               </div>
               <div>
               <label>Email:  {notification.email}</label>
               {/* <Input onChange={(e)=>handleInput(e)} name='name' value={user.name}/> */}
               </div>
             <div>
             <label>Blood Group:  {notification.blood_group}</label>
             {/* <Input onChange={(e)=>handleInput(e)} name='name' value={user.name}/> */}
             </div>
             <div>
             <label>Address:  {notification.address}</label>
             {/* <Input onChange={(e)=>handleInput(e)} name='name' value={user.name}/> */}
             </div>
            {/* <h3>{notification.title}</h3>
            <p>{notification.content}</p> */}
            
            <div className="button-container">
        <button className="accept-button" onClick={() => handleAccept(notification)}>Accept</button>
          <button className="reject-button" onClick={() => handleReject(notification)}>Reject</button>
          </div>
            </div>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPopUp;
