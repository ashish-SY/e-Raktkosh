import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './map.css';


const containerStyle = {
  width: '150vh',
  height: '60vh'
};

const center = {
  lat:28.7041 ,
  lng: 77.1025
}

var latitude;
var longitude;

function Map(props) {


  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [location,setLocation]=useState(center);

  const calldashboardPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);

      latitude = data.location.coordinates[1];
      longitude = data.location.coordinates[0];
      setLocation({
        lat:latitude,
        lng:longitude
      })

      const response = await fetch(`/map`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude, longitude
        })
      });


      const nearby = await response.json();


      setUsers(nearby);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (err) {
      console.log(err);
      // history('/login');
    }
  }

  useEffect(() => {
    calldashboardPage();

  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })



  const [map, setMap] = React.useState(null)
 
  const onLoad = map => {
    setMap(map);
  };

  return isLoaded ? (

    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={containerStyle}
      center={location}
      zoom={14}
      
    // onUnmount={onUnmount}       
    >
    
      {users && users.map(user => (
       
        <Marker

        label={{
            text: user.name + " " + user.blood_group,
            className:'custom-marker'
          }}
          position={{ lat: user.location.coordinates[1], lng: user.location.coordinates[0] }}
        
        />
      ))}

    </GoogleMap>

  ) : <></>
}

export default React.memo(Map)