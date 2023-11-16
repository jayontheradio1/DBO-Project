import React from 'react';
import './Card.css';

const Card = ({ type, title, description, imageUrl }) => {
  return (
    <div className={`card ${type}`}>
      <div className="card-image-container">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;