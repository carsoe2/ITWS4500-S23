import React from "react";
import './about.css';
import './template.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const yousif = require("./resources/yousif.jpg");
const dani = require("./resources/dani.jpg");
const daniel = require("./resources/daniel.jpg");
const eric = require("./resources/eric.png");
const jordan = require("./resources/jordan.jpg");

export default function AboutUs() {
    return (
        <div>
            <h1 id="mainHeader">About Us</h1>
            <br />
            <div className="container">
                <div className="text-center">
                    <p id="mainContent"> The VAST team is composed of dedicated college students currenlty studying at Rensselaer Polytechnic Inistitue, pusuring an undergraduate degree
                        in Information Technology and Web Science. We are each passionate about protecting our environment, and are contributing to
                        the fight against global warming in the way we know best; computer science and programming. Thanks to the help of our
                        outstanding professors and NASA's assistance in providing imperative data, we are able to create an application that educates
                        the future leaders of America the threat of global warming, and how we can best help our planet.
                    </p>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="box">
                    <div className="card-aboutus" style={{width: "18rem"}}>
                        <img className="card-img-top" src={dani} alt="dani" />
                        <div className="card-body">
                            <h5 className="card-title-aboutus">Dani DiTomasso</h5>
                            <p className="card-text-aboutus">Front-End Developer<br />
                                Long Island, NY
                            </p>
                        </div>
                    </div>
                    <div className="card-aboutus" style={{width: "18rem"}}>
                        <img className="card-img-top" src={eric} alt="eric" />
                        <div className="card-body">
                            <h5 className="card-title-aboutus">Eric Carson</h5>
                            <p className="card-text-aboutus">Back-End Developer<br />
                                Placentia, CA
                            </p>
                        </div>
                    </div>
                    <div className="card-aboutus" style={{width: "18rem"}}>
                        <img className="card-img-top" src={daniel} alt="daniel" />
                        <div className="card-body">
                            <h5 className="card-title-aboutus">Daniel Dorticos-Rossi</h5>
                            <p className="card-text-aboutus">Full-Stack Developer<br />
                                Brooklyn, NY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="container">
                <div className="box2">
                    <div className="card-aboutus" style={{width: "18rem"}}>
                        <img className="card-img-top" src={yousif} alt="yousif" />
                        <div className="card-body">
                            <h5 className="card-title-aboutus">Yousif Moftah</h5>
                            <p className="card-text-aboutus">Back-End Developer<br />
                                New York, NY
                            </p>
                        </div>
                    </div>
                    <div className="card-aboutus" style={{width: "18rem"}}>
                        <img className="card-img-top" src={jordan} alt="jordan" />
                        <div className="card-body">
                            <h5 className="card-title-aboutus">Jordan Oberstein</h5>
                            <p className="card-text-aboutus">Back-End Developer<br />
                                West Hartford, CT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}