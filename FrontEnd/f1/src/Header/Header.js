import logo from './f1_logo.svg'
import "./Style/Header.css"
import { useNavigate   } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    function onHeadHome() {
        console.log('1')
        navigate("/")
    }
    return (
        <div className="f1-header">
            <div className="f1-logo-section">
            <img src={logo} onClick={onHeadHome} alt="Formula 1"/>
            </div>
            <nav className="f1-nav">
                <div class="dropdown">
                    <div class="shadow__btn">Info</div>
                    <div class="dropdown-content">
                    <a href="/driver-info">Drivers</a>
                    <a href="/constructor-info">Constructors</a>
                    <a href="/circuit-info">Circuits</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="shadow__btn">Admin Form</button>
                    <div class="dropdown-content">
                    <a href="/raceform">Add Results</a>
                    <a href="/adddriver">Add Driver</a>
                    <a href="/addcons">Add Constructor</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="shadow__btn">Seasons</button>
                    <div class="dropdown-content">
                    <a href="/seasons">Get Seasons</a>
                  </div>
                </div>
                <div class="dropdown">
                    <button class="shadow__btn">Results</button>
                    <div class="dropdown-content">
                    <a href="/constructors">Constructor Results</a>
                    <a href="/drivers">Driver Results</a>
                    <a href="/top3">Top Three Wins</a>
                  </div>
                </div>
                <div>
                  <div class="dropdown">
                    <button class="shadow__btn">Analytics</button>
                    <div class="dropdown-content">
                    <a href="/rollup">Roll Up</a>
                    <a href="/podium">Podium</a>
                    <a href="/consistentdrivers">Consistent Drivers</a>
                    <a href="/driverpointseason">Driver Points Seasons</a>
                    <a href="/driverinfoyear">Driver Info Year</a>
                    <a href="/topavg">Top Drivers by Average</a>
                  </div>
               </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;