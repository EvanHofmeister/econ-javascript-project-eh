import React, { Component } from 'react';
// import '../App.css';
import * as d3 from 'd3';


export default function drawChart(data) {
    console.log("All data", data);
    console.log("Only observations", data.observations);
    // var filtered = [];

    // var data2 = data.length ? data.observations: data.observations;

    // Object.keys(data).map(
    //     (key) => data[key]
    // );
    // console.log("data2", data2);

    // var xname = document.getElementById("date").value;
    // var yname = document.getElementById("value").value;
    // // var jsObjects = document.getElementById("jstextarea").value;
    // var jsObjectsArray = eval(data.observations);
    // jsObjectsArray = jsObjectsArray.map( function (d) { return {key:d[xname], value:d[yname] }; });
    // console.log("Json Object Array: ", jsObjectsArray);




    var data = data.length ? data.observations: data.observations;

    data = data.map(function(obj, index){
        return {
            date: d3.timeParse("%Y-%m-%d")(obj.date),
            value: obj.value === '.' ? 0 : obj.value
        }
    })
    console.log("drawdown after manipulation", data);

    var margin = { top: 10, right: 30, bottom: 50, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#line_chart")
        // .append("svg")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    var xScale = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");


    // Add Y axis
    var yScale = d3.scaleLinear()
        .domain([-d3.max(data, function (d) { return +d.value; }), d3.max(data, function (d) { return +d.value; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(yScale));

    var line = d3.line()
        .x(function (d) { return xScale(d.date) })
        .y(function (d) { return yScale(d.value) })

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    return (
        <div id="line_chart"></div>
    // <React.Fragment>
    //     <div id="line_chart"></div>
    // </React.Fragment>
    );
    // return <div id="line_chart"></div>
    // return svg.node()
}