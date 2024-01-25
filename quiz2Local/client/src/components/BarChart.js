import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
var titleMap = new Map();

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:3000/quiz2/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will map out the records on the table
    function recordList() {
        if (records.length > 0) {
            return <div>
                <h3>Visualizations of "Born" component</h3>
                <BarChart results={records} />
                <h3>Visualizations of "Name" component</h3>
                <NameChart results={records} />
            </div>;
        }
    }

    // This following section will display the visualizations
    return (
        <div>
            <div>{recordList()}</div>
        </div>
    );
}

function drawChart(results) {
    var dataMap = new Map();
    for (var r of results) {
        try {
            dataMap.set(r.results[0].info.born.split(" ")[0].toUpperCase(), (dataMap.get(r.results[0].info.born) || 0) + 1);
        } catch { }
    }
    var labels = [];
    var data = [];
    for (var [key, value] of dataMap) {
        labels.push(key);
        data.push(value);
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] <= 2 || data[i] >= 25) {
            data.splice(i, 1);
            labels.splice(i, 1);
            i--;
        }
    }
    console.log(labels);
    console.log(data);
    var svg = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 300)
        .attr("class", "bar")
        .style("display", "block")
        .style("margin", "auto")
    svg.selectAll("rect").data(data).enter().append("rect")
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 300 - d * 10)
        .attr("width", 35)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        //.attr("class", "value")
        .text((d) => d)
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 300 - (10 * d) - 3)
    svg.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        //.attr("class", "bottom")
        .text((d) => d)
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 305);
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        //.attr("class", "title")
        //.attr("text-anchor", "middle")  
        //.style("font-size", "16px") 
        //.style("text-decoration", "underline")
        .text("Born Bar Graph");
}

function drawNameChart(results) {
    var dataMap = new Map();
    for (var r of results) {
        try {
            dataMap.set(r.results[0].name, (dataMap.get(r.results[0].name) || 0) + 1);
        } catch { console.log("error") }
    }
    var labels = [];
    var data = [];
    for (var [key, value] of dataMap) {
        labels.push(key);
        data.push(value);
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i] <= 2 || data[i] >= 25) {
            data.splice(i, 1);
            labels.splice(i, 1);
            i--;
        }
    }
    console.log(labels);
    console.log(data);
    var svg = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 300)
        .attr("class", "nameBar")
        .style("display", "block")
        .style("margin", "auto")
    svg.selectAll("rect").data(data).enter().append("rect")
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 300 - d * 10)
        .attr("width", 35)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        //.attr("class", "value")
        .text((d) => d)
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 300 - (10 * d) - 3)
    svg.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        //.attr("class", "bottom")
        .text((d) => d)
        .attr("x", (d, i) => i * 40)
        .attr("y", (d, i) => 305);
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        //.attr("class", "title")
        //.attr("text-anchor", "middle")  
        //.style("font-size", "16px") 
        //.style("text-decoration", "underline")
        .text("Born Bar Graph");
}

//BarChart Component
const BarChart = ({ results }) => {
    d3.select('svg.bar').remove();
    drawChart(results);
    return <div></div>;
}

const NameChart = ({ results }) => {
    d3.select('svg.nameBar').remove();
    drawNameChart(results);
    return <div></div>;
}