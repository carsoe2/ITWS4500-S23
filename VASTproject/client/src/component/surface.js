import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
//import * as d3_3d from 'd3-3d';
import { _3d } from 'd3-3d';
import { event as curEvent } from 'd3-selection';
//import drag from 'd3-drag';

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

        //planes.exit().remove();

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

    function dragStart(event, d) {
        if (event && event.sourceEvent.type === "mousedown") {
            setMX(event.x);
            setMY(event.y);
            setMouseX(beta);
            setMouseY(alpha);
        }
        dragRef.current.subject(d);
    }

    function dragged(event, d) {
        setMouseX(mouseX || 0);
        setMouseY(mouseY || 0);
        if (event && event.sourceEvent.type === "mousedown") {
            setBeta((event.x - mX + mouseX) * Math.PI / 230);
            setAlpha((event.y - mY + mouseY) * Math.PI / 230 * -1);
            console.log(beta);
            console.log(alpha);
        }
        const newPoints = surface.rotateY(beta + startAngle).rotateX(alpha - startAngle)(points);
        console.log(newPoints);
        setPoints(newPoints);
        processData(newPoints, 0);
    }

    function dragEnd(event, d) {
        if (event && event.sourceEvent && event.sourceEvent.type === "mousemove") {
            setMouseX(event.x - mX + mouseX);
            setMouseY(event.y - mY + mouseY);
            console.log("mouseX:" + mouseX);
        }
    }

    var dragger = d3.drag().on("drag", (event) => {
        const node = d3.select(event.sourceEvent.target);
        const curAngle = node.attr("transform");
        const rotation = curAngle ? parseFloat(curAngle.split("rotate(")[1].split(")")[0]) : 0;
        var alpha = rotation + event.dx * 0.5;
        var beta = rotation + event.dy * 0.5;
        node.attr("transform", `rotate(${alpha})`);
        //node.attr("transform", `rotateY(${beta})`);
    })

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", 1500)
            .attr("height", 720)
            .call(dragger)
        //.call(drag().on("start", dragStart).on("drag", dragged).on("end", dragEnd))
        svg.append("g");
        //dragRef.current = drag();
    }, [mouseX, mouseY, mX, mY]);

    useEffect(() => {
        change();
        console.log("change");
    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
};