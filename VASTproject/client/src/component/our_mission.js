import React from "react";
import './mission.css'
import './template.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const SolarPanels = require("./resources/Solar_panels.jpg");

export default function OurMission() {
    return (
        <div>
            <div className="text-center">
                <h1 id="mainHeader">Our Mission</h1>
                <h2>The Future is Renewable</h2>
                <img src={SolarPanels} className="rounded" style={{width:"700px", height:"250px"}} alt="solar panels"/>
            </div>
            <br />
            <p id="mainContent">At VAST, we want to not only provide relevant scientific data, but also strive to
                provide the education and understanding behind why the data we display is so important.
                Our application looks at a small subset of data provided from NASA's satellites, which includes both
                surface temperature and wind velocity data across the entire United States of America. Our goal is to present this
                data in an easy to understand fashion so that educators have all the information they need ready,
                along with interactive, pre-built data visulations, which can create discussions with students.
                Data should be presented in such a way that users can draw their own conclusions,
                such as where the best location to place renewable energy sources would be or what type of renewable
                energy should be used in a given area.
            </p>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card" style={{ width: "70rem" }}>
                        <div className="card-header">
                            What is Global Warming?
                        </div>
                        <div className="card-body-mission">
                            <blockquote className="blockquote mb-0">
                                <p>Within today's society, most individuals, both adults and children alike, have heard of
                                    global warming. But what is it actually? Global warming can be described as <strong>a
                                        rise in the near surface temperature of the Earth that is a direct result from the
                                        increased emissions of
                                        greenhouse gases.</strong> In fact, Scientists agree that the overall surface tempature
                                    of the Earth has
                                    risen 1 degree over the past 140 years. Some may argue that 1 degree is not something to be
                                    concerned about;
                                    however, the The Intergovernmental Panel on Climate Change (IPCC) concluded that this change
                                    has "increased concentrations of sulfate aerosols have led to relative cooling in some
                                    regions,
                                    generally over and downwind of heavily industrialized areas." </p>
                                <footer className="blockquote-footer"><cite title="Source Title">Resources:
                                </cite>https://earthobservatory.nasa.gov/glossary</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card" style={{ width: "70rem" }}>
                        <div className="card-header">
                            The Impact of Global Warming on our Environment
                        </div>
                        <div className="card-body-mission">
                            <blockquote className="blockquote mb-0">
                                <p> In addition to the sigificant increase to our surface tempature, global warming
                                    still has many far-reaching effects on the Earth that sigificantly impacts the environment.
                                    In regards to the environment, global warming "modifies rainfall patterns, amplifies coastal
                                    erosion, lengthens the growing season in some regions, melts ice caps and glaciers, and
                                    alters the ranges of
                                    some infectious diseases." Additionally, weather conditions and precipitation patterns
                                    become increasingly severe, with more intense heat waves, hurricances, and floods, just to
                                    name a few.
                                    And becuase the increase in tempature is causing our glaciers to melt, our sea levels are
                                    currenlty risisng
                                    faster than ever before.
                                </p>
                                <footer className="blockquote-footer"><cite title="Source Title">Resources:
                                </cite>https://earthobservatory.nasa.gov/features/GlobalWarming/page6.php</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card" style={{ width: "70rem" }}>
                        <div className="card-header">
                            The Impact of Global Warming on our Ecosystems
                        </div>
                        <div className="card-body-mission">
                            <blockquote className="blockquote mb-0">
                                <p> Becuase of the drastic effect that Global Warming has on our Earth, it therefore also
                                    effects the lifeforms and
                                    the ecosystems that our planet provides. Warmer tempatures means that migrating animals
                                    start seeking food sources earlier,
                                    and the shift in seasons may already be causing the lifecycles of pollinators, like bees, to
                                    be out of synch with flowering plants and trees.
                                    Additionally, a change in tempature also leads to an extension of growing seasons; this
                                    means that plants require more water to keep
                                    growing throughout the season, which increases the risk of failed crops and wildfires. In
                                    some cases, the tempature has become
                                    too extreme for certian species of animals to surivie, causing them to migrate towards the
                                    poles. However, becuasae they cannot adapt to the
                                    change in their entire environment fast enough, they may face extinction.
                                </p>
                                <footer className="blockquote-footer"><cite title="Source Title">Resources:
                                </cite>https://earthobservatory.nasa.gov/features/GlobalWarming/page6.php</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
                <br />
                <div clas="row">
                    <div className="card" style={{ width: "70rem" }}>
                        <div className="card-header">
                            The Impact of Global Warming on People
                        </div>
                        <div className="card-body-mission">
                            <blockquote className="blockquote mb-0">
                                <p> We as human beings also exist within the ecosystems that Earth provides, which means that
                                    Global Warming directly impacts us as well. As the
                                    zone of tropical tempatures expands, the spread and reach of infectious diseases, such as
                                    malaria, will also grow. More intense weather conditions,
                                    such as rains, hurricances, and risisng sea levels will cause more severe flooding and
                                    incresed potential for loss of life and property damage.
                                    Additionally, more frequent fires and hotter summer tempatures cause an increased risk of
                                    heat strokes and dealth, and if intense droughts occur,
                                    malnutrution is a possibiliy to those living in sigificantly affected areas.
                                </p>
                                <footer className="blockquote-footer"><cite title="Source Title">Resources:
                                </cite>https://earthobservatory.nasa.gov/features/GlobalWarming/page6.php</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}