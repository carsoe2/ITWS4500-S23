import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
//import * as d3_3d from 'd3-3d';
import { _3d } from 'd3-3d';
import { event as curEvent } from 'd3-selection';
import { drag } from 'd3-drag';

export default function SurfaceChart() {
    const [counter, setCounter] = useState(0);
    const [points, setPoints] = useState([]);
    const [alpha, setAlpha] = useState(0);
    const [beta, setBeta] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mX, setMX] = useState(0);
    const [mY, setMY] = useState(0);
    const svgRef = useRef();
    const dragRef = useRef();

    const j = 25;
    const origin = [500, 250];
    const startAngle = Math.PI / 2;

    const surface = _3d()
        .shape('SURFACE', j * 2)
        .scale(5)
        .x((d) => d.x)
        .y((d) => d.y)
        .z((d) => d.z)
        .origin(origin)
        .rotateY(startAngle)
        .rotateX(-startAngle);

    const color = d3.scaleLinear();

    function colorize(d) {
        const _y = (d[0].y + d[1].y + d[2].y + d[3].y) / 4;
        return d.ccw ? d3.interpolateSpectral(color(_y)) : d3.color(d3.interpolateSpectral(color(_y))).darker(2.5);
    }

    function processData(data, tt) {
        const planes = d3.select(svgRef.current).selectAll('path').data(data, (d) => d.plane);

        planes
            .enter()
            .append('path')
            .attr('class', '_3d')
            .attr('fill', colorize)
            .attr('opacity', 0)
            .attr('stroke-opacity', 0.1)
            .merge(planes)
            .attr('stroke', 'black')
            .transition()
            .duration(tt)
            .attr('opacity', 1)
            .attr('fill', colorize)
            .attr('d', surface.draw);

        planes.exit().remove();

        d3.selectAll('._3d').sort(surface.sort);
    }

    function init(eq) {
        var newPoints = [];

        for (let z = -j * 2; z < j * 2; z++) {
            for (let x = -j; x < j; x++) {
                newPoints.push({ x, y: eq(x + counter, z), z });
            }
        }

        const yMin = d3.min(newPoints, (d) => d.y);
        const yMax = d3.max(newPoints, (d) => d.y);

        color.domain([yMin, yMax]);
        setPoints(newPoints);
        processData(surface(newPoints), 1500);
    }

    function change() {
        setCounter(counter + 1);

        const eqa = (x, z) => {
            return Math.cos((Math.sqrt(x * x + z * z) / 5) * Math.PI);
        };

        init(eqa);
    }

    function colorize(d) {
        const _y = (d[0].y + d[1].y + d[2].y + d[3].y) / 4;
        return d.ccw ? d3.interpolateSpectral(color(_y)) : d3.color(d3.interpolateSpectral(color(_y))).darker(2.5);
    }

    function dragStart(d) {
        if (curEvent){// && event.sourceEvent.type === "mousedown") {
            setMX(curEvent.x);
            setMY(curEvent.y);
            setMouseX(beta);
            setMouseY(alpha);
            console.log("runs");
        } else {
            console.log(d);
        }
        dragRef.current.subject(d);
    }

    function dragged() {
        setMouseX(mouseX || 0);
        setMouseY(mouseY || 0);
        if (curEvent){// && event.sourceEvent.type === "mousedown") {
            setBeta((curEvent.x - mX + mouseX) * Math.PI / 230);
            setAlpha((curEvent.y - mY + mouseY) * Math.PI / 230 * -1);
            console.log(beta);
            console.log(alpha);
        }
        const newPoints = surface.rotateY(beta + startAngle).rotateX(alpha - startAngle)(points);
        setPoints(newPoints);
        processData(newPoints, 0);
    }

    function dragEnd() {
        if (curEvent){// && event.sourceEvent && event.sourceEvent.type === "mousemove") {
            setMouseX(curEvent.x - mX + mouseX);
            setMouseY(curEvent.y - mY + mouseY);
        }
    }


    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", 1500)
            .attr("height", 720)
            .call(drag().on("start", (d) => dragStart(d)).on("drag", dragged).on("end", dragEnd))
        svg.append("g");
        dragRef.current = drag();
    }, [mouseX, mouseY, mX, mY]);

    useEffect(() => {
        change();
    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
};