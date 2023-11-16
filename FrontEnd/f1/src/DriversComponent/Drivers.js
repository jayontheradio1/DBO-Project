import React from "react";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import DriverCard from "./DriversCard/Driverscard";
import './Driver.css'

const Drivers = () =>{
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/drivers_with_points')
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
     <h1>Drivers</h1>
      <div className = 'driverbox'>
        {drivers.map((driver,index) => (
          <DriverCard place={index} name={driver.driver_name} driverid={driver.driver_id} team={driver.constructor_name} points={driver.points} flag={driver.driver_nationality} url={driver.image}/>
        ))}
      </div>
    </div>
);
}

export default Drivers;