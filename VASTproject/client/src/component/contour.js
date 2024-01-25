import React, { useRef, useState, useEffect } from "react";
import { _3d } from 'd3-3d';
import Plot from "./plot";
//import "./contour.css";
import "./template.css";

export default function Contour() {
    const [records, setRecords] = useState([]);
    const [month, setMonth] = useState(1);
    const [beta, setBeta] = useState(-Math.PI / 2);
    const [change, setChange] = useState(false);
    const prevMonthRef = useRef();
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`https://carsoe2.eastus.cloudapp.azure.com/node/api/windVel`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            setRecords(record[month].data.result);
        }

        getRecords();
        setChange(false);
        prevMonthRef.current = month;
        return;
    }, [month, beta, change]);



    if (records.length > 0) {
        return (
            <div>
                <h3>Monthly Wind Average of Mainland USA</h3>
                <h3>{month} / 2022</h3>
                <button type="button" onClick={(e) => incrementMonth(e)}>Next Month</button>
                <button type="button" onClick={(e) => rotateDown(e)}>Rotate Up</button>
                <button type="button" onClick={(e) => rotateUp(e)}>Rotate Down</button>
                <Plot data={records} beta={beta} />
            </div>
        );
    }

    function rotateUp(e) {
        e.preventDefault();
        if (beta < - Math.PI / 4) {
            setBeta(beta + 15 * Math.PI / 180);
        } else {
            setBeta(-Math.PI/4);
        }
        setChange(true);
        console.log(beta);
    }

    function rotateDown(e) {
        e.preventDefault();
        if (beta > -Math.PI / 2) {
            setBeta(beta - 15 * Math.PI / 180);
        } else {
            setBeta(-Math.PI/2);
        }
        setChange(true);
        console.log(beta);
    }

    function incrementMonth(e) {
        e.preventDefault();
        if (month == 12) {
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
        setChange(true);
    }
};