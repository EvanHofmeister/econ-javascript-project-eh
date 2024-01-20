import React, { useRef, useEffect, useState } from "react";
// import '../App.css';
import * as d3 from 'd3';
import { select, line, curveCardinal } from "d3";
import {Line} from "./Line";









export default function RunLine (inputData){


    const [data, setData] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [availableDates, setAvailableDates] = useState({});
    const [formData, setFormData] = useState({
        minDate: new Date().toISOString().slice(0, 10),
        maxDate: new Date().toISOString().slice(0, 10)
    });


    const options = {
        margin2: { left: 100, right: 100, top: 50, bottom: 100 },
        size: { width: 1000, height: 400 },
        labelsPositions: { xAxis: { x: 0, y: -10 }, yAxis: { x: 10, y: 20 } },
        labelsText: { xAxis: "year", yAxis: "value ($)" },
        labelsClasses: { xAxis: "x-axisLabel", yAxis: "y-axisLabel" },
        tooltipContainer: { width: 120, height: 40, x: -60, y: -50 },
        tooltipTextPositions: { xAxis: { x: -53, y: -35 }, yAxis: { x: -53, y: -19 } },
        tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " ($)" },
        lineClass: "line2",
        lineColor: 'red',
        zoomEnabled: true,
        tooltipEnabled: true,
        xDateScale: true,
    };

    const parseTime = d3.timeParse("%d/%m/%Y");

    const getAvailableDates = (data) => {
        const dates = {};
        Object.keys(data).forEach(coin => {
            dates[coin] = data[coin].map(d => d['date']);
        })

        setAvailableDates(dates);

        setFormData({
            ...formData,
            ...(dates[formData].at(0) && { minDate: new Date(dates[formData].at(0)).toISOString().slice(0, 10) }),
            ...(dates[formData].at(0) && { maxDate: new Date(dates[formData].at(-1)).toISOString().slice(0, 10) })
        })
    };






    useEffect(() =>   {

        var dataCopy = data.length ? data.observations: data.observations;
        dataCopy = data.map(function(obj, index){
            return {
                date: d3.timeParse("%Y-%m-%d")(obj.date),
                value: obj.value === '.' ? 0 : obj.value
            }
        })
        console.log("Use Effect Data ", dataCopy);

        setData(dataCopy);
        setParsedData(dataCopy);
        getAvailableDates(dataCopy);

        // const svg = select(svgRef.current);
        // const myLine = line()
        //     .x((value, index) => data.date)
        //     .y(value => data.value);
        // // svg
        // //   .selectAll("circle")
        // //   .data(data)
        // //   .join("circle")
        // //   .attr("r", value => value)
        // //   .attr("cx", value => value * 2)
        // //   .attr("cy", value => value * 2)
        // //   .attr("stroke", "red");
        // svg
        //     .selectAll("path")
        //     .data([data])
        //     .join("path")
        //     .attr("d", value => myLine(value))
        //     .attr("fill", "none")
        //     .attr("stroke", "blue");



    }, [inputData]);

    return (
        <div>
            {/*<h1>D3 Line</h1>*/}

            {/*<header className="App-header">*/}
            {/*    {parsedData && <Line_v7*/}
            {/*        data={parsedData}*/}
            {/*        options={options}*/}
            {/*        availableDates={availableDates}*/}
            {/*        formData={formData}*/}
            {/*        setFormData={setFormData}*/}
            {/*        xKey="date"*/}
            {/*        yKey={formData.var}*/}
            {/*        id="svg-area"*/}

            {/*        // xKey="year"*/}
            {/*        // yKey={"value"}*/}
            {/*    />*/}
            {/*    }*/}
            {/*    /!* </div> *!/!*!/}
            {/!*</header>*/}
        </div>
    );
}
