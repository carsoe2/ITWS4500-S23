import React from "react";
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const facebook = require("./resources/facebook.png");
const twitter = require("./resources/twitter.png");
const insta = require("./resources/insta.png");
const linkedIn = require("./resources/linkedin.png");
const nasa = require("./resources/nasa_website.png");

export default function Footer() {
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="fixed-bottom">
                <footer className="bg-dark text-center text-white" style={{ fontSize: "12px" }}>
                    <div className="container p-2 pb-0">
                        <section className="mb-2">
                            <a href={"https://www.facebook.com/NASA"}>
                                <img className="icon" src={facebook} alt="facebook link"/>
                            </a>

                            <a href={"https://twitter.com/NASA"}>
                                <img className="icon" src={twitter} style={{ height: "30px" }} alt="twitter link"/>
                            </a>

                            <a href={"https://www.instagram.com/nasa/?next=%2F"}>
                                <img className="icon" src={insta} style={{ width: "55px" }} alt="instagram link"/>
                            </a>

                            <a href="https://www.linkedin.com/company/nasa">
                                <img className="icon" src={linkedIn} style={{ height: "30px", width: "30px" }} alt="NASA linked in"/>
                            </a>

                            <a href="https://www.nasa.gov/">
                                <img className="icon" src={nasa} alt="NASA homepage link"/>
                            </a>
                        </section>
                    </div>

                </footer>
            </div>
        </div>
    );
}