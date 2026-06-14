import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar(){
    return (
        <>
        <nav className="navbar">
            <div className="nav-brand"> World Cup Sweepstake Tracker</div>
            <ul className="nav-list"> 
                <li>
                    <NavLink to="/" className="nav-link">-Home-</NavLink>
                    <NavLink to="/groups" className="nav-link">Groups-</NavLink>
                    <NavLink to="/games" className="nav-link">Games-</NavLink>
                    <NavLink to="/league" className="nav-link">League-</NavLink>
                    <NavLink to="/bracket" className="nav-link">Bracket-</NavLink>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar;