import { NavLink } from "react-router-dom";
import "./NavBar.css"

function NavBar(){
    return (
        <>
        <nav className="navbar">
            <div className="nav-brand"> Ilkley Waugh World Cup Sweepstake</div>
            <ul className="nav-list"> 
                <li>
                    <NavLink to="/" className="nav-link">Home </NavLink>
                    <NavLink to="/groups" className="nav-link">Groups </NavLink>
                    <NavLink to="/games" className="nav-link">Games </NavLink>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar;