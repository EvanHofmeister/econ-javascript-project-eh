import { LinearProgress, Typography } from "@mui/material";
// import { makeStyles } from '@mui/styles';


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {CoinList} from "./services/dataService.js";
import { CryptoState } from "./SeriesContextAPI";
// import Shaded from "./Shaded.js";
// import Bar from "./Bar.js";
// import Line from "./Line.js";
import drawChart from "./D3charts.js";
// import ConnectedScatterplot from "./D3Test.js";
// import LineChart from "./D3line-chart.js";
// import D3charts2 from "./D3charts2";
import D3charts3 from "./D3charts3.js";
import RunLine from "./D3charts3.js";
import * as d3 from "d3";
import {Line} from "./Line";
// import drawChart2 from "./D3charts2.js";


export default function Graph_Router() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    // const { currencyVars, typeVars } = CryptoState();
    // const { currency, setCurrency } = currencyVars;
    // const { type, setType } = typeVars;
    const {currency, setCurrency,
        symbol, type, setType,
        startDate, setStartDate,
        endDate, setEndDate,
        minDate, setMinDate,
        maxDate, setMaxDate,
        resetParameters, setResetParameters} = CryptoState();


    // function fetchContentByType(fred_series, type, startDate, endDate){
    //     // var ids = this.getSeriesId(type).split('-'),
    //     //     that = this;
    //     var ids = fred_series.split('-'),
    //         that = this;
    //     console.log("Graph ids", ids);
    //
    //     ids = ids.map((id) => {
    //         return CoinList(id, startDate, endDate)
    //     });
    //     return ids.reduce((promiseChain, currentTask) => {
    //         return promiseChain.then(chainResults =>
    //             currentTask.then(currentResult =>
    //                 [ ...chainResults, currentResult ]
    //             )
    //         );
    //     }, Promise.resolve([])).then(arrayOfResults => {
    //         that.setState((state) => ({
    //             data : [].concat(arrayOfResults)
    //         }));
    //     });
    // }
















    /////////////------------------
    const [data, setData] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    // const [resetParameters, setResetParameters] = useState(null);
    const [availableDates, setAvailableDates] = useState({});
    const [formData, setFormData] = useState({
        var: 'price_usd',
        coin: 'FRED',
        minDate: new Date().toISOString().slice(0, 10),
        maxDate: new Date().toISOString().slice(0, 10)
    });


    // const options = {
    //     margin2: { left: 100, right: 100, top: 50, bottom: 100 },
    //     size: { width: 1000, height: 400 },
    //     labelsPositions: { xAxis: { x: 0, y: -10 }, yAxis: { x: 10, y: 20 } },
    //     labelsText: { xAxis: "year", yAxis: "value ($)" },
    //     labelsClasses: { xAxis: "x-axisLabel", yAxis: "y-axisLabel" },
    //     tooltipContainer: { width: 120, height: 40, x: -60, y: -50 },
    //     tooltipTextPositions: { xAxis: { x: -53, y: -35 }, yAxis: { x: -53, y: -19 } },
    //     tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " ($)" },
    //     lineClass: "line2",
    //     lineColor: 'blue',
    //     zoomEnabled: true,
    //     tooltipEnabled: true,
    //     xDateScale: true,
    // };

    const parseTime = d3.timeParse("%d/%m/%Y");

    // const getAvailableDates = (data) => {
    //     const dates = {};
    //     // Object.keys(data).forEach(coin => {
    //     //     dates[coin] = data[coin].map(d => d['date']);
    //     // })
    //     dates['FRED'] = data.map(d => d['date']);
    //
    //     console.log("getAvailableDates dates: ", dates);
    //     console.log("dates.at(0)).toISOString().slice(0, 10): ", (dates['FRED'].at(0)));
    //
    //     setAvailableDates(dates);
    //
    //     setFormData({
    //         ...formData,
    //         // ...(dates['FRED'].at(0) && { minDate: new Date(dates['FRED'].at(0)).toISOString().slice(0, 10) }),
    //         // ...(dates['FRED'].at(0) && { maxDate: new Date(dates['FRED'].at(-1)).toISOString().slice(0, 10) })
    //         ...(dates[formData.coin].at(0) && { minDate: new Date(dates[formData.coin].at(0)).toISOString().slice(0, 10) }),
    //             ...(dates[formData.coin].at(0) && { maxDate: new Date(dates[formData.coin].at(-1)).toISOString().slice(0, 10) })
    //     })
    // };



    const getAvailableDates = (data) => {
        const dates = {};

        dates['FRED'] = data.map(d => d['date']);

        return {
            'minDate' : new Date(dates['FRED'].at(0)).toISOString().slice(0, 10),
            'maxDate' : new Date(dates['FRED'].at(-1)).toISOString().slice(0, 10),
            'startDate' : new Date(dates['FRED'].at(0)).toISOString().slice(0, 10),
            'endDate' : new Date(dates['FRED'].at(-1)).toISOString().slice(0, 10)

        };
    };


    // useEffect(() =>   {
    //
    //     var dataCopy = coins.length ? coins.observations: coins.observations;
    //
    //     dataCopy = dataCopy.map(function(obj, index){
    //         return {
    //             date: d3.timeParse("%Y-%m-%d")(obj.date),
    //             value: obj.value === '.' ? 0 : obj.value
    //         }
    //     })
    //     console.log("Use Effect Data ", dataCopy);
    //
    //     setData(dataCopy);
    //     setParsedData(dataCopy);
    //     getAvailableDates(dataCopy);
    //
    //     // const svg = select(svgRef.current);
    //     // const myLine = line()
    //     //     .x((value, index) => data.date)
    //     //     .y(value => data.value);
    //     // // svg
    //     // //   .selectAll("circle")
    //     // //   .data(data)
    //     // //   .join("circle")
    //     // //   .attr("r", value => value)
    //     // //   .attr("cx", value => value * 2)
    //     // //   .attr("cy", value => value * 2)
    //     // //   .attr("stroke", "red");
    //     // svg
    //     //     .selectAll("path")
    //     //     .data([data])
    //     //     .join("path")
    //     //     .attr("d", value => myLine(value))
    //     //     .attr("fill", "none")
    //     //     .attr("stroke", "blue");
    //
    //
    //
    // }, [coins]);
    ////////////-------------------

    const fetchCoins = async () => {
        // setLoading(true);

        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        // const URL = 'https://api/entries';

        // const { data } = await axios.get(PROXY_URL + CoinList(currency, '1999-08-14','2019-08-13'));
        const { data } = await axios.get(PROXY_URL + CoinList(currency, '1900-01-01','2099-01-01'));

        // const { data } = await axios(CoinList(currency, '1999-08-14','2019-08-13'), {
        //     method: 'GET',
        //     mode: 'no-cors',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     withCredentials: true,
        //     credentials: 'same-origin',
        // }).then(response => {
        // })

        // console.log("Fetch Coin Return", data);
        // console.log("Fetch Coin Return", type);

        setCoins(data);
        setLoading(false);






    };

    useEffect(() => {
        fetchCoins();
        // drawChart(coins);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    // useEffect(() => {
    //     if(coins?.observations) {
    //
    //         console.log("Fetch Coin Return xx", coins);
    //         console.log("Fetch Coin Return ", type);
    //         // switch (type) {
    //         //     case 'shaded':
    //         //         return <Shaded data={coins}/>;
    //         //     case 'bar':
    //         //         return <Bar data={coins}/>;
    //         //     case 'line':
    //         //         console.log("line switch", coins);
    //         //         return <Line data={coins}/>
    //         //
    //         //     default:
    //         //         return 'No component to render';
    //         // };
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //
    //
    //         // var dataCopy = coins.length ? coins.observations: coins.observations;
    //         //
    //         // dataCopy = dataCopy.map(function(obj, index){
    //         //     return {
    //         //         date: d3.timeParse("%Y-%m-%d")(obj.date),
    //         //         value: obj.value === '.' ? 0 : obj.value
    //         //     }
    //         // })
    //         // console.log("Use Effect Data ", dataCopy);
    //
    //         // setData(dataCopy);
    //         // setParsedData(dataCopy);
    //         // getAvailableDates(dataCopy);
    //
    //         // var data = data.length ? coins.observations: coins.observations;
    //         //
    //         // data = data.map(function(obj, index){
    //         //     return {
    //         //         date: d3.timeParse("%Y-%m-%d")(obj.date),
    //         //         value: obj.value === '.' ? 0 : obj.value
    //         //     }
    //         // })
    //
    //         var dataCopy = coins.observations;
    //
    //         dataCopy = dataCopy.map(function (obj, index) {
    //             return {
    //                 date: d3.timeParse("%Y-%m-%d")(obj.date),
    //                 value: obj.value === '.' ? 0 : Number(obj.value)
    //             }
    //         })
    //         console.log("Use Effect Data ", dataCopy);
    //         // console.log("dataCopy Min Date ", dataCopy.date.at(0).toISOString().slice(0, 10));
    //
    //
    //         getAvailableDates(dataCopy) // Causing infinate loop of render
    //
    //         setMinDate(formData.minDate)
    //         setMaxDate(formData.maxDate)
    //         setStartDate(formData.minDate)
    //         setEndDate(formData.maxDate)
    //
    //         // setMinDate(new Date(availableDates['FRED'].at(0)).toISOString().slice(0, 10))
    //         // setMaxDate(new Date(availableDates['FRED'].at(-1)).toISOString().slice(0, 10))
    //         // setStartDate(new Date(availableDates['FRED'].at(0)).toISOString().slice(0, 10))
    //         // setEndDate(new Date(availableDates['FRED'].at(-1)).toISOString().slice(0, 10))
    //
    //         setData(dataCopy);
    //         setParsedData(dataCopy);
    //
    //
    //         console.log("startDate - first: ", startDate.toString())
    //         // console.log("startDate: ", new Date (startDate))
    //
    //         const dataTimeFiltered = data
    //             ?.filter(d =>
    //                 new Date(d['date']).getTime() >= new Date (startDate).getTime()
    //                 && new Date(d['date']).getTime() <= new Date(endDate).getTime());
    //         console.log("filter test: ", dataTimeFiltered)
    //
    //         // console.log("dataCopy : ", dataCopy);
    //         // console.log("options : ", options);
    //         // console.log("availableDates : ", availableDates);
    //         // console.log("formData : ", formData);
    //         // console.log("setFormData : ", setFormData);
    //         // console.log("formData.var : ", formData.var);
    //     }
    // }, [coins]);

    useEffect(() => {
        if(coins?.observations) {


            let data = coins.observations.map(function (obj, index) {
                return {
                    date: d3.timeParse("%Y-%m-%d")(obj.date),
                    value: obj.value === '.' ? 0 : Number(obj.value)
                }
            })

            let dateObjects = getAvailableDates(data)

            // getAvailableDates(coins.observations) // Causing infinate loop of render
            setMinDate(dateObjects.minDate)
            setMaxDate(dateObjects.maxDate)
            setStartDate(dateObjects.minDate)
            setEndDate(dateObjects.maxDate)

            setData(data);
            setParsedData(data);

            // const options = {
            //     margin2: { left: 100, right: 100, top: 50, bottom: 100 },
            //     size: { width: 1000, height: 400 },
            //     labelsPositions: { xAxis: { x: 0, y: -10 }, yAxis: { x: 10, y: 20 } },
            //     // labelsText: { xAxis: "year", yAxis: "value ($)" },
            //     labelsText: { xAxis: "year", yAxis: symbol},
            //     labelsClasses: { xAxis: "x-axisLabel", yAxis: "y-axisLabel" },
            //     tooltipContainer: { width: 120, height: 40, x: -60, y: -50 },
            //     tooltipTextPositions: { xAxis: { x: -53, y: -35 }, yAxis: { x: -53, y: -19 } },
            //     // tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " ($)" },
            //     tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: symbol },
            //
            //     lineClass: "line2",
            //     lineColor: 'blue',
            //     zoomEnabled: true,
            //     tooltipEnabled: true,
            //     xDateScale: true,
            // };
        }
    }, [coins]);


    useEffect(() => {


          // const coinData = coins;
          // const minDateToFilter = name === 'minDate' ? value : formData.minDate;
          // const maxDateToFilter = name === 'maxDate' ? value : formData.maxDate;
          //
          // console.log("App Coin Data: ", coinData)
          // const dataTimeFiltered = data
          //   .filter(d =>
          //     new Date(d['date']).getTime() >= new Date(formData.minDate).getTime()
          //     && new Date(d['date']).getTime() <= new Date(formData.maxDate).getTime());
          //   console.log("filter test: ", dataTimeFiltered)
        console.log("startDate - second: ", startDate.toString())
        // console.log("startDate: ", new Date (startDate))

        const dataTimeFiltered = data
            ?.filter(d =>
                new Date(d['date']).getTime() >= new Date (startDate).getTime()
                && new Date(d['date']).getTime() <= new Date(endDate).getTime());
        console.log("filter test: ", dataTimeFiltered)

        setParsedData(dataTimeFiltered);
    }, [startDate, endDate]);


    // useEffect(() => {
    //     if(coins?.observations) {
    //         console.log("resetParameters", resetParameters)
    //
    //         setStartDate(minDate)
    //         setEndDate(maxDate)
    //
    //
    //     }
    // setResetParameters(false)
    // }, [resetParameters]);










    // var dataCopy = coins.length ? coins.observations: coins.observations;


    // const handleSearch = () => {
    //     return coins.filter(
    //         (coin) =>
    //             coin.name.toLowerCase().includes(search) ||
    //             coin.symbol.toLowerCase().includes(search)
    //     );
    // };



    if (loading) {
        return <div>loading...</div>;
    }

    const options = {
        margin2: { left: 100, right: 100, top: 50, bottom: 100 },
        size: { width: 1000, height: 400 },
        labelsPositions: { xAxis: { x: 0, y: -10 }, yAxis: { x: 10, y: 20 } },
        // labelsText: { xAxis: "year", yAxis: "value ($)" },
        labelsText: { xAxis: "year", yAxis: symbol},
        labelsClasses: { xAxis: "x-axisLabel", yAxis: "y-axisLabel" },
        tooltipContainer: { width: 120, height: 40, x: -60, y: -50 },
        tooltipTextPositions: { xAxis: { x: -53, y: -35 }, yAxis: { x: -53, y: -19 } },
        // tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " ($)" },
        tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " (" + symbol + ")"},

        lineClass: "line2",
        lineColor: 'blue',
        zoomEnabled: true,
        tooltipEnabled: true,
        xDateScale: true,
    };

    // var dataCopy = coins.observations;
    //
    // dataCopy = dataCopy.map(function(obj, index){
    //     return {
    //         date: d3.timeParse("%Y-%m-%d")(obj.date),
    //         value: obj.value === '.' ? 0 : obj.value
    //     }
    // })
    // console.log("Use Effect Data ", dataCopy);
    // // console.log("dataCopy Min Date ", dataCopy.date.at(0).toISOString().slice(0, 10));
    //
    // getAvailableDates(dataCopy) // Causing infinate loop of render
    // console.log("dataCopy : ", dataCopy);
    // console.log("options : ", options);
    // console.log("formavailableDatesData : ", availableDates);
    // console.log("formData : ", formData);
    // console.log("setFormData : ", setFormData);
    // console.log("formData.var : ", formData.var);






    return (
        <div></div>
        // RunLine(coins),
        // ,drawChart(coins)

        // ,<div>
        //     <D3charts2 data={coins} />
        // </div>


        // ,<div>
        //     <D3charts3 data={coins} />
        // </div>


        ,<div>
            {<Line
        data={parsedData}
        options={options}
        // availableDates={availableDates}
        // formData={formData}
        // setFormData={setFormData}
        // xKey="date"
        // yKey={formData.var}
        id="svg-area"

            xKey="date"
            yKey={"value"}
        />}
        </div>





        // ,ConnectedScatterplot(coins.observations, {
        //     x: d => d.date,
        //     y: d => d.value,
        //     // title: d => d.year,
        //     // orient: d => d.side,
        //     yFormat: ".2f",
        //     xLabel: "Miles driven (per capita per year) →",
        //     yLabel: "↑ Price of gas (per gallon, adjusted average $)",
        //     // width,
        //     height: 720,
        //     duration: 5000 // for the intro animation; 0 to disable
        // })

            // ,<div className="Graph_2">
            // LineChart(coins, {
            //     x: d => d.date,
            //     y: d => d.value,
            //     yLabel: "↑ Daily close ($)",
            //     // width,
            //     height: 500,
            //     color: "steelblue"
            // })
            // </div>
    );
}

