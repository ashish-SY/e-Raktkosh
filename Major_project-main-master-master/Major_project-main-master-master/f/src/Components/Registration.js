import React, { useState,useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import './Registration.css';
import Swal from "sweetalert2";

function Registration() {


  const history = useNavigate();

  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", phone_number: "", age: "", address: "", district: "", pincode: "",state: "", gender: "", blood_group: ""
  });

  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");

  // this is for the current location of the user

  const getLocation=()=>{
 
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition((position)=>{
           setLatitude(position.coords.latitude);
           setLongitude(position.coords.longitude);
       })
     }
     
   }
 
useEffect(() => {
 getLocation()
},[]);
  
  const [image,setImage] =useState("");

  const setFile=(e)=>{
    setImage(e.target.files[0]);
  }
  console.log(image);
   
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    
    setUser({ ...user, [name]: value });
     

  }





  const PostData = async (e) => {
    e.preventDefault();
    // const { name, email, password, cpassword, phone_number, age, address, district, pincode,state, gender, blood_group } = user;
     
    var formData=new FormData();
    formData.append("name",user.name);
    formData.append("email",user.email);
    formData.append("password",user.password);
    formData.append("cpassword",user.cpassword);
    formData.append("phone_number",user.phone_number);
    formData.append("age",user.age);
    formData.append("address",user.address);
    formData.append("district",user.district);
    formData.append("pincode",user.pincode);
    formData.append("state",user.state);
    formData.append("gender",user.gender);
    formData.append("blood_group",user.blood_group);
    formData.append("latitude",latitude);
    formData.append("longitude",longitude);
    formData.append("photo",image);

    const config={
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }

    if (!user.name || !user.email || !user.password || !user.cpassword || !user.phone_number || !user.address || !user.district || !user.pincode || !user.state || !user.age ||
      !user.gender || !user.blood_group) {
        Swal.fire({
          title: "Invalid Credentials",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 2000
        });
  }else{
    const res= await axios.post("/signup",formData,config);

    console.log(res.data);



    if (res.data.status === 422  || !res.data) {
      Swal.fire({
        title: "Invalid Credentials",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000
      });
      // window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }
    else {
      Swal.fire({
        title: "OTP Send Successful",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000
      });
      // window.alert("Successfull");
      console.log("Successfull");

      history("/otp");

    }

  }
  }


  return (
    <>

      <div className="reg-form">
      
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8 col-sm-offset-2 text">
              <h1><strong>Register Yourself</strong></h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-8 col-sm-offset-2 form-box">
              <form className='form-horizontal'>
                <div className="form-group row">
                  <label className="p-0">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter Full Name" name="name" value={user.name}
                    onChange={handleInputs} />
                </div>

                <div className="form-group row">
                  <label className="p-0">Email</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="email" value={user.email}
                    onChange={handleInputs} />
                </div>

                <div className="form-group row">
                  <div className="form-group col p-0">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={user.password}
                      onChange={handleInputs} />
                  </div>
                  <div className="form-group col p-r-0">
                    <label> Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" name="cpassword" value={user.cpassword}
                      onChange={handleInputs} />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="form-group col p-0">
                    <label>Phone Number</label>
                    <input type="number" className="form-control" placeholder="Enter contact no" name="phone_number" value={user.phone_number}
                      onChange={handleInputs} />
                  </div>

                  <div className="from-group col">

                    <label>Age</label>
                    <input type="number" className="form-control" placeholder="Enter your age" name="age" value={user.age}
                      onChange={handleInputs} />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="p-0">Address</label>
                  <input type="text" className="form-control" placeholder="Enter your address" name="address" value={user.address}
                    onChange={handleInputs} />
                </div>
                <div className="form-group row">
                  <label className="p-0">District</label>
                  <input type="text" className="form-control" placeholder="Enter district" name="district" value={user.district}
                    onChange={handleInputs} />
                </div>

                <div className="form-group row">
                  <div className="form-group col p-0">
                    <label>Pin Code</label>
                    <input type="number" className="form-control" placeholder="Enter Pin Code" name="pincode" value={user.pincode}
                      onChange={handleInputs} />
                  </div>
                  <div className="form-group col p-r-0">
                    <label> State</label>
                    <input type="text" className="form-control" placeholder="State" name="state" value={user.state}
                      onChange={handleInputs} />
                  </div>
                  <div className="form-group col p-r-0">
                    <label>Image</label>
                    <input type="file" className="form-control" name="photo"
                      onChange={setFile} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col p-0">
                    <label>Gender</label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={user.gender}
                      onChange={handleInputs}>
                      <option>Choose..</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                  </div>
                  <div className="form-group col">
                    <label>Blood Group</label>
                    <Form.Control as="select"
                      name="blood_group"
                      value={user.blood_group}
                      onChange={handleInputs}>
                      <option>Choose..</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Control>
                  </div>
                </div>

                {/* <div className="form-group row">
                
              </div> */}
                <center>
                  <button type="submit" className="btn-default" onClick={PostData}>Register</button></center>
                <p className="forgot-password text-left ">Already have an account? <Link className="login-btn" to="/login">Login</Link> </p>
                {/* {flag && (
              <Alert color="primary" variant="danger">Every Field is Required!</Alert>
            )} */}
              </form>
            </div>
          </div>
        </div>
        {/* // ) : (
          //   <Login />
          // )} */}
      </div>

    </>
  );
}

export default Registration;