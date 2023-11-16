import React, { useState } from 'react';
import './raceinput.css';

function AddConstructor() {
  const [formData, setFormData] = useState({
    constructorid: '', // You can hide or disable this field if it's auto-generated
    name: '',
    nationality: '',
    constructorref: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/constructor', {
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

  return (
    <div>    
    <form class="form" onSubmit={handleSubmit}>
      <div class="title">Constructor</div>
      <div class="subtitle">Add a new Constructor!</div>
      <div class="input-container ic1">
        <input id="firstname" class="input" type="number" placeholder=" " name="constructorid" value={formData.constructorid} onChange={handleChange}/>
        <div class="cut"></div>
        <label for="firstname" class="placeholder">ConstructorID</label>
      </div>
      <div class="input-container ic2">
        <input id="lastname" class="input" placeholder=" " type="text" name="name" value={formData.name} onChange={handleChange} />
        <div class="cut"></div>
        <label for="lastname" class="placeholder">Driver Name</label>
      </div>
      <div class="input-container ic2">
        <input id="email" class="input" placeholder=" " type="text" name="nationality" value={formData.nationality} onChange={handleChange}/>
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Nationality</label>
      </div>
      <div class="input-container ic2">
        <input id="email" class="input" placeholder=" " type="number" name="constructorref" value={formData.constructorref} onChange={handleChange}/>
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Constructor Ref</label>
      </div>
      <button type="text" class="submit">Submit</button>
    </form></div>
  );
}

export default AddConstructor;