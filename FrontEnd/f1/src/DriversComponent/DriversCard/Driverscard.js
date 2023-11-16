import React from 'react';
import './DriversCard.css';
import logo from './image.png'
import logo1 from './national.png'

const DriverCard = ({ name, team, points, flag, driverid, place, url }) => {
    return (
        <div className="card">
            <div className="header">
                <span className="position">{place+1}</span>
                <span className="points">{points} PTS</span>
            </div>
            <div className="info">
                <span className="name">{name}</span>
                <img src={logo1} alt="flag" className="flag" />
            </div>
            <span className="team">{team}</span>
            <div className='image-div'><img src={url} /></div>
            
            <div className="footer">
                <span className="position-footer">{driverid}</span>
            </div>
        </div>
    );
}

export default DriverCard;