import { useState, useEffect } from "react";
import ConstructorCard from './ConstructorCard'
import './constructors.css'

const Constructors = () => {
    const [constructors, setConstructors] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/constructors_with_points')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setConstructors(data);
          console.log('Constructors loaded:', data);  // Log the state to the console
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, []);
    return(
<div className="constructorbox">
     <h1>Constructors</h1>
      {/* <ul>
        {constructors.map((constructors,index) => (
         <ConstructorCard pos={index} constructor_name={constructors.constructor_name} drivers = {constructors.drivers} points = {constructors.total_points}/>
        ))}
      </ul> */}
      <ConstructorCard data={constructors}/>
    </div>
    );
}

export default Constructors;