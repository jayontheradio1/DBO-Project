import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header.js'
import Drivers from './DriversComponent/Drivers';
import Constructors from './Constructors/constructors';
import RaceForm from './RaceInput/raceinput.js';
import Seasons from './Seasons/seasons.js';
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
import GridContainer from './Home/GridContainer.js';

function App() {
   
  const cardsData = [
    {
      type: 'feature', // You can use this to apply different styles or layouts
      title: 'This Week in F1 - Las Vegas Special: 10 quiz questions on Formula 1’s newest race',
      description: 'FEATURE | F1 UNLOCKED',
      imageUrl: 'https://d2n9h2wits23hf.cloudfront.net/image/v1/static/6057949432001/e214ab29-13a8-4d2f-8317-e1c4c1d07941/a3efbe74-21dc-4ee2-8dbe-673c7cd85b6f/1316x740/match/image.jpg' // Replace with the actual path to your image
    },
    {
      type: 'video',
      title: 'WATCH: Sainz and Leclerc interview each other on racing in Las Vegas, victory celebrations, and Elvis',
      description: 'VIDEO',
      imageUrl: 'https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1700047043/fom-website/2023/Las%20Vegas/SI202311151706_hires_jpeg_24bit_rgb%20(1).jpg.transform/6col/image.jpg'
    },
    {
      type: 'news',
      title: 'Red Bull unveil special fan-designed Las Vegas livery ahead of weekend’s inaugural Grand Prix',
      description: 'NEWS',
      imageUrl: 'https://media.formula1.com/image/upload/t_16by9South/f_auto/q_auto/v1699983837/fom-website/2023/Brawn%20Documentary/Keanu_Jensen_01805.jpg.transform/6col/image.jpg'
    },
    // ... more card data
  ];
 

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
        <Route path='/' element={<GridContainer cardsData={cardsData}/>} exact />
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
