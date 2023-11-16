import { useState, useEffect } from "react";
import './rollup.css'

function Circuit() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/circuits')
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
        <h1>Consistent Drivers</h1>
         
         <div className = 'raceResults'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Circuit ID
                        </th>
                        <th>
                            Circuit Name
                        </th>
                        <th>
                            Circuit Ref
                        </th>
                        <th>
                            Country
                        </th>
                        <th>
                            Length
                        </th>
                        <th>
                            Location
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
                {driver.circuitid}
                </td>
                <td>
                {driver.circuitname}
                </td>
                <td>
                {driver.circuitref}
                </td>
                <td>
                {driver.country}
                </td>
                <td>
                {driver.length}
                </td>
                <td>
                {driver.location}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div>     
    );
}

export default Circuit;