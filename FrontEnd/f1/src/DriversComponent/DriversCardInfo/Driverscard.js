import React from 'react';
import './DriversCard.css';
import logo from './image.png'
import logo1 from './national.png'

const DriverCard = ({ name, team, DOB, email, flag, phonenumber, driverid, place, url }) => {
    return (
        <div className="card">
            <div className="header">
                <span className="position">{place+1}</span>
            </div>
            <div className="info">
                <span className="name">{name}</span>
                <img src={logo1} alt="flag" className="flag" />
            </div>
            <div>
                <h3>DOB</h3>
                <span className="name">{DOB}</span>
                <h3>Phone</h3>
                <span className="name">{phonenumber}</span>
            </div>
            <div>
            <h3>Email</h3>
                <span className="email">{email}</span>
            </div>
            <h3>Team</h3>
            <span className="team">{team}</span>
            <div className='image-div'><img src={url} /></div>
            
            <div className="footer">
                <span className="position-footer">{driverid}</span>
            </div>
        </div>
    );
}

export default DriverCard;