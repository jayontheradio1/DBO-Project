import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header.js'
import Drivers from './DriversComponent/Drivers';
import Constructors from './Constructors/constructors';
import RaceForm from './RaceInput/raceinput.js';
import Seasons from './Seasons/seasons.js';
import Home from './Home/home.js';
import AddDriver from './DriversComponent/AddDriver/adddriver.js';

import React from 'react';
import DriversInfo from './DriversComponent/Drivers-Info/driversinfo.js';
import Rollup from './DriversComponent/Rollup/rollup.js';
import PodiumFinishers from './Podium/Podium.js';
import AddConstructor from './Constructors/AddConstructors/addconstructors.js';
import ConsistentDrivers from './DriversComponent/ConsistentDrivers/consistentdrivers.js';
import DriverPointSeason from './DriversComponent/DriverPointsSeason/driverpointseason.js';
import DriverInfoYear from './DriversComponent/DriverInfoYear/driverinfoyear.js';
import TopThree from './Top3/topthree.js';
import NoWin from './DriversComponent/DriversWithnowin/Nowin.js';
import TopAvg from './DriversComponent/TopAvgDriver/TopAVG.js';
import ConstructorInfo from './Constructors/ConstructorInfo/ConstructorInfo.js';
import Circuit from './Circuit/Circuit.js';

function App() {
 

  return (
    <Router>
      <Header/>
      {/* <Drivers/>
      <Constructors/>
      <RaceForm/>
      <Seasons/> */}
    <Routes>
        <Route path="/drivers" element={<Drivers />} exact />
        <Route path="/constructors" element={<Constructors />} exact />
        <Route path="/raceform" element={<RaceForm />} exact />
        <Route path="/seasons" element={<Seasons />} exact />
        <Route path='/' element={<Home />} exact />
        <Route path='/driver-info' element={<DriversInfo/>} exact />
        <Route path="/adddriver" element={<AddDriver/>} exact />
        <Route path="/rollup" element={<Rollup/>} exact />
        <Route path='/addcons' element={<AddConstructor/>} exact />
        <Route path="/podium" element={<PodiumFinishers/>} exact />
        <Route path='/consistentdrivers' element={<ConsistentDrivers/>} exact />
        <Route path='/driverpointseason' element={<DriverPointSeason/>} exact />
        <Route path='/driverinfoyear' element={<DriverInfoYear/>} exact />
        <Route path='/top3' element={<TopThree/>} exact />
        <Route path='/nowin' element={<NoWin/>} exact />
        <Route path='/topavg' element={<TopAvg/>} exact />
        <Route path='/constructor-info' element={<ConstructorInfo/>} exact />
        <Route path='/circuit-info' element={<Circuit/>} exact />
    </Routes>
  </Router>
  );
}

export default App;
