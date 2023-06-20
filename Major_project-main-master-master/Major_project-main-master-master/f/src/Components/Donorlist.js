
import {useEffect, useState} from "react";
import Donordata from "./Donordata.js";

export default function Donorlist() {
    

  const [users, setUsers] = useState();

  const fetchUsers=async()=> {
    
        const res=await fetch('/list_show',{
          method:"GET",
          headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
          },
          credentials:"include"
        });
        const data = await res.json();
      setUsers(data);
  }


  useEffect(() => {
      fetchUsers();
  }, [])
  // console.log(users);
    return (
      // <div className="donortable">
      <div class="table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table table-bordered table-striped mb-0">
      <thead>
      <tr>
      <th style={{textAlign: "center"}}>No.</th>
      <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Address</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Blood Group</th>
      </tr>
      </thead>
      <tbody style={{textAlign: "center"}}>
        {
          users && users.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1} </th>
                    <td>{item[0].name}</td>
                    <td>{item[0].address}</td>
                    <td>{item[0].email}</td>
                    <td>{item[0].blood_group}</td>
                </tr>
            )
        })
        }
           {/* users.map((curUser) => {
                    const {id, name, email} = curUser;
                    const {street, city, zipcode} = curUser.address;

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                        </tr>
                    )
                }) */}
      {/* <Donordata users={users}/> */}
      </tbody>
  </table>
      </div>
    );
  }