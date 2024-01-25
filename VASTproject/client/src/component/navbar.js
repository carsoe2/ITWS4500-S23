import React from "react";
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Dropdown from "react-bootstrap/Dropdown";
import logo from './resources/logo.png';
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
    return (
        <nav className="navbar">

            <NavLink className="navbar-brand" to="/">
                <img src={logo} width={"32"} height={"32"} className="d-inline-block align-top" alt="Logo" />
                VAST
            </NavLink>
            <span>
                <Dropdown>
                    <Dropdown.Toggle type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        MENU
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu" id="dropdown">
                        <NavLink className="dropdown-item" to="/node/">Home</NavLink>
                        <NavLink className="dropdown-item" to="/node/ourMission">Our Mission</NavLink>
                        <NavLink className="dropdown-item" to="/node/surfaceTemp">Surface Tempature Data</NavLink>
                        <NavLink className="dropdown-item" to="/node/windVel">Wind Velocity Data</NavLink>
                        <NavLink className="dropdown-item" to="/node/educationalResources">Educational Resources</NavLink>
                        <NavLink className="dropdown-item" to="/node/aboutUs">About Us</NavLink>
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        </nav>
    );
}