import React, { useState, useContext, createContext } from "react";
import './idx.css';
import { UserContext } from "../../App";
import { useEffect } from 'react';
import Map from './Map';
// import DDonorlist from '../Donorlist';
import DDonorlist from '../NotificationPopUp';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



export default function Dashcontent() {

  const { state1, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const [data_state, setstate] = useState({});

  const [data_city, setcity] = useState({});
  const [data_blood, setbloodgroup] = useState({});
  const [data_hospital, sethospital] = useState({});
  const [dynamic, setdynamic] = useState({});
  const [final_data_hospital, setfinalhospital] = useState({});
  const [donor_list, setdonorlist] = useState({});
 ;



  const city = ['Bareilly', 'Gorakhpur', 'Jhansi', 'Prayagraj'];
  const Blood_Group = ['Search Blood group', 'AB-', 'AB+', 'A-', 'A+', 'B-', 'B+', 'OH-', 'OH+', 'O-', 'O+'];
  const state = ['Search State', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Puducherry', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  const hospital = [];
  const filter_data = [];

  for (var j = 0; j < data_hospital.length; j++) {
    if (data_hospital[j].district === data_city)
      hospital.push(data_hospital[j].hospitals_name);
  }
  // console.log(data_hospital);
  // console.log(data_city);
  for (var j = 0; j < donor_list.length; j++) {
    if (donor_list[j].district === data_city) {
      filter_data.push(donor_list[j].hospitals_name);
    }
  }
  // 
  let a, b;
  var latitude;
  var longitude;
  const [user, setUser] = useState({ _state: "", _city: "", _Blood_Group: "", _hospital: "" });
  const handleChange = async (e) => {

    e.preventDefault();
    // console.log('ashish');
    // const { _state, _city, _Blood_Group, _hospital } = user;
    const _state = data_state;
    const _city = data_city;
    const _Blood_Group = data_blood;
    const _hospital = final_data_hospital;

    
    const res = await fetch("/donor_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _state, _city, _Blood_Group, _hospital
      })

    });
    const data = await res.json();
   

    if (res.status === 400 || !data) {
      Swal.fire({
        title: "Invalid Credentials",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000
      });
      // window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true })
      let timerInterval
      Swal.fire({
        title: 'In Progress..Please Wait',
        html: '',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            // b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      history('/list');
    }

  }

  const loginUser = async (e) => {
    let res = await fetch('/hospital_list', {
      method: "POST",
    });
    const data = await res.json();
    sethospital(data);

  }
   
      
  const xxx = async (e) => {
    let res = await fetch('/xxx', {
      method: "POST",
    });
    const data = await res.json();
    setdynamic(data);
    console.log(data);
  }



  const handleChange3 = (e) => {
    setstate(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
    setcity(null);
  }
  const handleChange4 = (e) => {
    setcity(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }


  const handleChange6 = (e) => {
    setbloodgroup(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }

  const handleChange5 = (e) => {
    setfinalhospital(e.target.value)
    a = e.target.name;
    b = e.target.value;
    setUser({ ...user, [a]: b });
  }


  var final_city = [];
  if (data_state == 'Uttar Pradesh')
    final_city = city;

  useEffect(() => {
    loginUser();
    xxx();
  },
    [null]);

  // console.log(hospital);

  return (
    <div className="Dashcontent">


      <form onSubmit={handleChange} method="POST">
        <div className="panel panel-danger">
          <div className="panel-heading">Search Blood Availability</div>
          <div className="panel-body">

            <div className="row">
              <div className="col-md-3">
                <select className="form-control" name='stateCode' id='stateCode' onChange={handleChange3} >
                  {state.map(optn => (
                    <option>{optn}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <select className="form-control" name='Blood_Group' onChange={handleChange6} >
                  {Blood_Group.map(optn => (
                    <option>{optn}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <select className="form-control" name='city' onChange={handleChange4} >
                  <option>Select City</option>
                  {final_city.map(optn => (
                    <option>{optn}</option>
                  ))}
                </select>
              </div>


              <div className="col-md-3">

                <select className="form-control" name='hospital' onChange={handleChange5} >
                  <option>Hospital Name</option>
                  {hospital.map(optn => (
                    <option>{optn}</option>
                  ))}
                </select>


              </div>
            </div>


          </div>
          <div class="row">
            <div class="col-md-12" align="center">

              {/* <button type="button" id="searchButton" className="btn-btn" onclick={<DDonorlist/>}><Link style={{textDecoration: 'none', color:'#ffff'} } to='/donorlist'>search</Link></button> */}
              <button id="searchButton" className="btn-btn">Submit</button>
              
            </div>
          </div>
        </div>
      </form>
     
      <button className="btn-btn "><Link className='near-btn' to='/nearby_users'>Search Nearby</Link></button>


      {/* <form onSubmit = {handleChange} method="POST">
             <div>
             <select class="selectpicker" name='state' onChange={handleChange3} >
                 {state.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>

             <div>
             <select class="selectpicker" name='city' onChange={handleChange4} >
                 {final_city.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div>
             <select class="selectpicker" name='Blood_Group' onChange={handleChange6} >
                 {Blood_Group.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div>
             <select class="selectpicker" name='hospital' onChange={handleChange5} >
                 {hospital.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <center>
                   <button tabindex="4" type="submit">Submit</button></center>
             </form> */}
      {/* <div className='cards'>

        <div className='dash-card'>
          <div className="cardheader">Total Blood request Receive</div>
          <div className="cardbody">{dynamic[0]}</div>
        </div>

        <div className='dash-card'>
          <div className="cardheader2">Registered Blood Groups</div>
          <div className="cardbody2">{dynamic.final_result}</div>
        </div>

        <div className='dash-card'>
          <div className="cardheader3">Total Quries</div>
          <div className="cardbody3"></div>

        </div>

      </div> */}

      <div className="map">
        <Map />
      </div>

    </div>

  );
}