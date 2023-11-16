import React from 'react';
import './TeamCard.css'; // Make sure to create a corresponding CSS file with this name

const TeamCard = ({ place, ID, constructorref, name, Nation, image }) => {
  return (
    <div className="team-card">
      <div className="team-header">
      <h2 className="team-name">ID: {ID}</h2>
      
        <span className="team-points">Country:{Nation}</span>
      </div>
      <div className="team-drivers">
          <div key={place} className="driver-info">
          <h2 className="team-name">{constructorref}</h2>
          <h2 className="team-name">{name}</h2>
          </div> 
      </div>
      <img src={image} alt="Race Car" className="team-car" />
    </div>
  );
};

export default TeamCard;