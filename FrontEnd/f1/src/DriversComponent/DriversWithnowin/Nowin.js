import { useState, useEffect } from "react";
import './rollup.css'

function NoWin() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/drivers-never-won')
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
        <h1>Drivers with no win</h1>
         
         <div className = 'raceResults'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Driver Name
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr>
                <td>
                {driver.driver_name}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div>     
    );
}

export default NoWin;