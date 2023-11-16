import React from 'react';
import Card from './Card';
import './GridContainer.css';


const GridContainer = ({ cardsData }) => {
  return (
    <div className="grid-container">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default GridContainer;
