import React from "react";
import { useState, useEffect } from "react";
import TeamCard from "../TeamCard/TeamCard";

const ConstructorInfo = () =>{
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/constructors')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setDrivers(data);
          console.log('Drivers loaded:', data);  // Log the state to the console
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, []);
return(
    <div>
     <h1>Constructors</h1>
      <div className = 'driverbox'>
        {drivers.map((driver,index) => (
          <TeamCard place={index} ID={driver.constructorid} constructorref={driver.constructorref} name={driver.name} Nation={driver.nationality} image={driver.image}/>
        ))}
      </div>
    </div>
);
}

export default ConstructorInfo;