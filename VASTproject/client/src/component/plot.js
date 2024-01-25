import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
//import * as d3_3d from 'd3-3d';
import { _3d } from 'd3-3d';
import { event as curEvent } from 'd3-selection';
import USA from "./resources/redUSMap2.jpg";
//import { drag } from 'd3-drag';

export default function Plot({ data, beta }) {
    const [points, setPoints] = useState([]);
    const svgRef = useRef();

    const j = 25;
    const origin = [600, 300];
    const startAngle = Math.PI / 2;

    const surface = _3d()
        .shape('SURFACE', j * 2)
        .scale(5)
        .x((d) => d.x)
        .y((d) => d.y)
        .z((d) => d.z)
        .origin(origin)
        .rotateY(2 * startAngle)
        .rotateX(beta)
        .rotateZ(0);

    const color = d3.scaleLinear();

    function colorize(d) {
        const _y = (d[0].y + d[1].y + d[2].y + d[3].y) / 4;
        return d.ccw ? d3.interpolateSpectral(color(_y)) : d3.color(d3.interpolateSpectral(color(_y))).darker(1.2);
    }

    function processData(info, tt) {
        const planes = d3.select(svgRef.current).selectAll('path').data(info, (d) => d.plane);

        planes
            .enter()
            .append('path')
            .attr('class', '_3d')
            .attr('fill', colorize)
            .attr('opacity', 1)
            .attr('stroke-opacity', .1)
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
        if (data.length > 0) {
            for (let x = 0; x < 94; x++) {
                for (let z = 0; z < 50; z++) {
                    newPoints.push({ x, y: eq(x, z), z });
                }
            }
        }

        const yMin = d3.min(newPoints, (d) => d.x);
        const yMax = d3.max(newPoints, (d) => d.y);

        color.domain([yMin, yMax]);
        setPoints(newPoints);
        processData(surface(newPoints), 15);
    }

    function change() {
        const eq = (x, z) => {
            if (data.length > 0 && z < 51 && x < 94) {
                return parseFloat(5 * data[z][x]);
            } else {
                return 0;
            }
        };

        init(eq);
    }

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", 1000)
            .attr("height", 500);
        svg.append("g");
        /*
        if (Math.round(beta, 2) == Math.round(-Math.PI / 2), 2) {
            svg.append('svg:image').attr("xlink:href", USA)
                .attr("width", 470)
                .attr("height", 255)
                .attr("x", 94)
                .attr("y", 51)
                .style("pointer-events", "none")
                .style("z-index", 1)
        } else {
            const image = svg.select("svg:image");
            if (!image.empty()) {
                image.remove();
            }
        }
        */

        surface.rotateX(beta);
    }, [beta]);

    useEffect(() => {
        change();
    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
};