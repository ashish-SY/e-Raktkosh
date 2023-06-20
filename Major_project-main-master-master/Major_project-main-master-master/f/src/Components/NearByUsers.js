import React from 'react';
import { useEffect, useState } from "react";

const center = {
    lat: 28.7041,
    lng: 77.1025
}

var latitude;
var longitude;

export default function NearByUsers() {

    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [location, setLocation] = useState(center);

    const searchNearby = async (e) => {
       
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
                lat: latitude,
                lng: longitude
            })

            const response = await fetch(`/nearbyusers`, {
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
        searchNearby();

      }, []);

 

    return (
        <>

            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                <table class="table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>No.</th>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Address</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Blood Group</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {
                           
                           users.map((item, index) => (
                                
                                    <tr key={index}>
                                        <th scope="row">{index + 1} </th>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.email}</td>
                                        <td>{item.blood_group}</td>
                                    </tr>
                            
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </>
    )
}