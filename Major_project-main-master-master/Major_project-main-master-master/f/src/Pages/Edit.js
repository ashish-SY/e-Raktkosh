import React, { useState,useEffect } from 'react';
import {Input,Button,FormControl,FormGroup} from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate,useParams } from 'react-router';

function Edit(){

const [user,setUser]=useState({
    name:"",address:""
});




const {id}=useParams();


const history = useNavigate();


useEffect(()=>{
    loadUserDetails();
},[]);

const loadUserDetails= async ()=>{
      
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
        console.log(data);
        setUser(data);
       
        
    
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
        }
    
    
      } catch (err) {
        console.log(err);
        history ('/login');
      }
     
}

const handleInput=(e)=>{

      setUser({...user ,[e.target.name]:e.target.value});
     
        
}

const PostData= async (e) => {
     
       e.preventDefault();

       var formData=new FormData();
       formData.append("name",user.name);
       formData.append("address",user.address);

       const config={
        headers:{
          "Content-Type":"application/json"
        }
      }
  
      const res= await axios.patch(`/edit/${id}`,formData,config);
      
      if (res.data.status === 401  || !res.data) {
        Swal.fire({
          title: "Error",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 2000
        });
      
        console.log("Invalid Registration");
      }
      else {

        Swal.fire({
          title: "Updated",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000
        });
        history("/team")
      
      }
}
    return(
      <>
      
         <Input onChange={(e)=>handleInput(e)} name='name' value={user.name}/>< br></br>
       
         <Input onChange={(e)=>handleInput(e)} name='address' value={user.address}/>< br></br>
        
         <Button type="submit" className='btn btn-primary' onClick={PostData}>Submit</Button>
      
        </>
    )
}

export default Edit;