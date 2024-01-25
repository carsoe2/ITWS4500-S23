import React from "react";
import { NavLink } from "react-router-dom";
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const vastImage = require("./resources/vast_image.png");
const mission = require("./resources/our_mission.jpg");
const sTemp = require("./resources/surface_temp.jpg");
const wVel = require("./resources/wind_velocity.png");
const rpi = require("./resources/rpi.jpg");
const gio = require("./resources/giovanni_logo.png");

export default function Index() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className=".col-xl-4">
                        <img id="vast" src={vastImage} alt="vast large logo"/>
                    </div>
                </div>
                <div className="row">
                    <div className="card w-90">
                        <div className="row">
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">OUR MISSION</h5>
                                    <p className="card-text">VAST's goal is to create an easy-to-naviagte application for
                                        accessing satellite data and educational resources about renewable energy
                                        across the entire United States.
                                    </p>
                                    <NavLink className="btn btn-primary" to="/node/ourMission">FIND OUT MORE</NavLink>
                                </div>
                            </div>
                            <div className="col">
                                <img className="image" src={mission} alt="mission page link"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card w-90">
                        <div className="row">
                            <div className="col">
                                <img className="image" src={sTemp} alt="surface temperature data link"/>
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">SURFACE TEMPATURE DATA</h5>
                                    <p className="card-text">See the changes of the surface tempature within the United 
                                    States, pulled directly from NASA's own satellites.
                                    </p>
                                    <NavLink className="btn btn-primary" to="/node/surfaceTemp">FIND OUT MORE</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card w-90">
                        <div className="row">
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">WIND VELOCITY DATA</h5>
                                    <p className="card-text">See the changes of the wind velocity within the United States, 
                                    pulled directly from NASA's own satellites.
                                    </p>
                                    <NavLink className="btn btn-primary" to="/node/windVel">FIND OUT MORE</NavLink>
                                </div>
                            </div>
                            <div className="col">
                                <img className="image" src={wVel} alt="wind velocity data link"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card w-90">
                        <div className="row">
                            <div className="col">
                                <img className="image" src={gio} alt="other educational resources link"/>
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">EDUCATIONAL RESOURCES</h5>
                                    <p className="card-text"> We provide interactive visualizations and materials for all
                                        ages! Check out our learning experience and decide where the best location for 
                                        renewable energy may be.
                                    </p>
                                    <NavLink className="btn btn-primary" to="/node/educationalResources">FIND OUT MORE</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card w-90">
                        <div className="row">
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">ABOUT US</h5>
                                    <p className="card-text"> Meet the team behind VAST! Information Technology
                                        and Web Science students at Rensselaer Polytechnic
                                        Institute.
                                    </p>
                                    <NavLink className="btn btn-primary" to="/node/aboutUs">FIND OUT MORE</NavLink>
                                </div>
                            </div>
                            <div className="col">
                                <img className="image" src={rpi} alt="link to about us page"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}