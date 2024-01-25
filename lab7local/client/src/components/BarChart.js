import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
var titleMap = new Map();

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:3000/db/`);

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
                <h4>Features elements that shares a birthday</h4>
                <BarChart results={records} />
                <PieChart results={records} />
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

function drawPieChart(results) {
    var dataMap = new Map();
    for (var r of results) {
        try {
            dataMap.set(r.results[0].info.born.split(" ")[0].toUpperCase(), (dataMap.get(r.results[0].info.born) || 0) + 1);
        } catch { }
    }
    var labels = [];
    var values = [];
    for (var [key, value] of dataMap) {
        labels.push(key);
        values.push(value);
    }
    for (var i = 0; i < values.length; i++) {
        if (values[i] <= 2 || values[i] >= 25) {
            values.splice(i, 1);
            labels.splice(i, 1);
            i--;
        }
    }

    var data = [{}];
    labels.map(i => {
        values.map(j => {
            data.push({ label: i, value: j });
        })
    });
    console.log(data);

    var svg = d3.select("body").append("svg")
        .attr("width", 700)
        .attr("height", 700)
        .attr("class", "pie")
        .style("margin", "auto");

    var radius = 200;
    var g = svg.append("g").attr("transform", "translate(350,350)");
    //var color = d3.scaleOrdinal(['#ffd1a9', '#ff9e79', '#fb6d4c', '#c23b22', '#8a0000', '#580000']);
    const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateCool)
        .domain([0, data.length]);
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Generate the pie
    var pie = d3.pie().padAngle(0).value((data) => data.value);

    //Generate groups
    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .style('fill', (_, i) => colorScale(i))
        //.style('stroke', '#ffffff')
        //.style('stroke-width', 0)
        //add text
        /*
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text((d) => d.data.label)*/
        .style('fill', (_, i) => colorScale(data.length - i))
        .attr('transform', (d) => {
            const [x, y] = arc.centroid(d);
            return `translate(${x}, ${y})`;
        });

    //Draw arc paths
    arcs.append("path")
        .attr("d", arc);
}

//BarChart Component
const BarChart = ({ results }) => {
    d3.select('svg.bar').remove();
    drawChart(results);
    return <div></div>;
}

//PieChart Component
const PieChart = ({ results }) => {
    d3.select('svg.pie').remove();
    drawPieChart(results);
    return <div></div>;
}