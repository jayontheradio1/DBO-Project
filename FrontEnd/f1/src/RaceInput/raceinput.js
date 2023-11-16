import React, { useState } from 'react';
import './raceinput.css';

function RaceForm() {
  const [showButton, setShowButton] = useState(false)
  const [formData, setFormData] = useState({
    raceid: '', // You can hide or disable this field if it's auto-generated
    date: '',
    year: '',
    time: '',
    lap: '',
    circuitid: '',
  });
  const [formData1, setFormData1] = useState({
    resultsid: '',
    race_id: '',
    driver_id: '',
    constructor_id: '',
    points: '',
    grid: '',
    RankR: '',
    positionorder: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(true);
    try {
      const response = await fetch('http://localhost:5000/race', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Race data added successfully
        // You can redirect or display a success message here
      } else {
        // Handle error, display an error message, etc.
        alert('An error occurred while saving data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData1),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful submission
          alert('Result data saved successfully');
          // Optionally, reset the form
          setFormData({
            resultsid: '',
            race_id: '',
            driver_id: '',
            constructor_id: '',
            points: '',
            grid: '',
            RankR: '',
            positionorder: '',
            position: '',
          });
        } else {
          // Handle error when saving data
          alert('Failed to save result data');
        }
      })
      .catch((error) => {
        // Handle network error or other exceptions
        console.error('Error:', error);
        alert('An error occurred while saving data');
      });
    
  };
  const changeState = () => {
    setShowButton(false);
  }

  return (
    <div>
      {!showButton && (
        
        <div>    
        <form class="form" onSubmit={handleSubmit}>
          <div class="title">Races</div>
          <div class="subtitle">Create a race!</div>
          <div class="input-container ic1">
            <input id="firstname" class="input" type="text" placeholder=" " name="raceid" value={formData.raceid} onChange={handleChange}/>
            <div class="cut"></div>
            <label for="firstname" class="placeholder">RaceID</label>
          </div>
          <div class="input-container ic2">
            <input id="lastname" class="input" placeholder=" " type="date" name="date" value={formData.date} onChange={handleChange} />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">Date</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="year" value={formData.year} onChange={handleChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Year</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="time" name="time" value={formData.time} onChange={handleChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Time</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="lap" value={formData.lap} onChange={handleChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Lap</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="circuitid" value={formData.circuitid} onChange={handleChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">CircuitID</label>
          </div>
          <button type="text" class="submit">Submit</button>
        </form></div>
      )}
{showButton && (
 <div>
       <div>    
        <form class="form" onSubmit={handleSubmit1}>
          <div class="title">Results</div>
          <div class="subtitle">Add the results of the driver!</div>
          <div class="input-container ic1">
            <input id="firstname" class="input" type="number" name="resultsid" value={formData1.resultsid} onChange={handleInputChange}/>
            <div class="cut"></div>
            <label for="firstname" class="placeholder">ResultID</label>
          </div>
          <div class="input-container ic2">
            <input id="lastname" class="input" placeholder=" " type="number" name="race_id" value={formData1.race_id} onChange={handleInputChange} />
            <div class="cut"></div>
            <label for="lastname" class="placeholder">RaceID</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="text" name="driver_id" value={formData1.driver_id} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">DriverID</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="text" name="constructor_id" value={formData1.constructor_id} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">ConstructorID</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="points" value={formData1.points} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Points</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="grid" value={formData1.grid} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Grid</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="number" name="RankR" value={formData1.RankR} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">RankR</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="text" name="positionorder" value={formData1.positionorder} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Position Order</label>
          </div>
          <div class="input-container ic2">
            <input id="email" class="input" placeholder=" " type="text" name="position" value={formData1.position} onChange={handleInputChange}/>
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">Position</label>
          </div>
          <button type="text" class="submit">Submit</button>
          <button class="submit" onClick={changeState}>Done</button>
        </form></div>
</div>
    )}
    </div>
  );
}

export default RaceForm;