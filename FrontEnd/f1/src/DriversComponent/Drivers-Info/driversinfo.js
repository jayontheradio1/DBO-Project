import React from "react";
import { useState, useEffect } from "react";
import DriverCard from "../DriversCardInfo/Driverscard";
import './Driver.css'

const DriversInfo = () =>{
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/drivers')
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
          <DriverCard place={index} DOB={driver.DOB} email={driver.email} phonenumber={driver.phonenumber} name={driver.name} driverid={driver.driver_id} team={driver.constructor_name} flag={driver.driver_nationality} url={driver.image}/>
        ))}
      </div>
    </div>
);
}

export default DriversInfo;