import React, { useEffect, useState, Component } from 'react';

import {getObservationsBySeriesId, getTreasuryProduct} from './services/dataService';
import config from "./config/config";

import * as d3 from "d3";

import axios from "axios";
import Plot from "react-plotly.js";
import { CryptoState } from "./SeriesContextAPI";


import xml2js from 'xml2js';
import * as math from "dayjs";
let parser = new xml2js.Parser({explicitChildren: true, preserveChildrenOrder:true, charsAsChildren: true, fallback: { "timers": false }});



function parseXml(xmldata) {
    return new Promise((resolve, reject) => {
        parser.parseString(xmldata, (error, result, ) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function transpose_2d(original) {
    var copy = [];

    for (var i = 0; i < original.length; ++i) {
        let tmp = 0
        for (var j = 0; j < original[i].length; ++j) {
            if(i == 0){
                copy[tmp]=[]
            }
            copy[j][i] = original[i][j];

            tmp+=1
        }
    }
    return copy;
}


function pop(obj, key) {
    var val = obj[key];
    delete obj[key];
    return val;
}

async function testXmlParse2(xml) {
    try {
        let data = await parseXml(xml)
        const data2 = data.feed["entry"]

        // console.log("data2: ", data2)
        var result = [];
        //const result2 = [];

        Object.keys(data2).forEach(function(e) {
            var that = this;
            Object.keys(data2[e]["content"][0]["m:properties"][0]).forEach(function(a) {
                //console.log("KEY TEST", data2[e]["content"][0]["m:properties"][0])
                if(!that[a]) {
                    that[a] = {id: a, [e]: data2[e]["content"][0]["m:properties"][0][a][0]}
                    result.push(that[a])
                } else {
                    Object.assign(that[a], {[e]: data2[e]["content"][0]["m:properties"][0][a][0]})
                }
            })
        }, {})

        //result = result.slice(result,[1])
        var dates = result.slice(2,3);
        //Order of tener rate maintained in result arrays
        var tmp = result.slice(3,12)
        var result2 = tmp.map((_, colIndex) => tmp.map(row => row[colIndex]));
        // console.log("tmp stringify", JSON.stringify(tmp))


        ////These were uncommented
        // console.log("testXmlParse2 data2: ", data2)
        // console.log("testXmlParse2 dates: ", dates)
        // console.log("testXmlParse2 result: ", result)
        // console.log("testXmlParse2 result2: ", result2)



        // console.log("tmp.map( Object.values): ", tmp.map(Object.values))
        // console.log("tmp: ", tmp)
        // console.log("transpose(tmp): ", transpose(tmp))

        // console.log("tmp keys: ", Object.keys(tmp))


        // for (var j in Object.keys(tmp[1])) {
        //     console.log("j:", j)
        // }
        // console.log("tmp[i][j][Object.keys(tmp[1][239])[0]]: ", tmp[1][238])
        // console.log("tmp[1][239][1] == null: ", tmp[1][238] == null)

        ///
        var tmp2 = []
        var i_numeric = 0

        for (var i in Object.keys(tmp)) {
            pop(tmp[i],"id")
            tmp2[i_numeric] = []
            var j_numeric = 0
            for (var j in Object.keys(tmp[i])) {
                // console.log("var i: ", tmp[i][j])
                if(tmp[i][j] == null) {
                    tmp2[i_numeric][j_numeric] = 'None'
                    // tmp2.push(tmp[i][j][Object.keys(tmp[i][j])[0]])

                    // console.log("tmp2 inter: ", tmp2)

                    // console.log("tmp[i][j][Object.keys(tmp[i][j])[0]]: ", i, j, tmp[i][j][Object.keys(tmp[i][j])[0]])
                    // console.log("Object.keys(tmp[i][j])", i, j, Object.keys(tmp[i][j])[0])
                }
                else{
                    tmp2[i_numeric][j_numeric] = tmp[i][j][Object.keys(tmp[i][j])[0]]
                    // console.log("tmp[i][j][Object.keys(tmp[i][j])[0]]: ", i, j, tmp[i][j][Object.keys(tmp[i][j])[0]])
                    // console.log("Object.keys(tmp[i][j])", i, j, Object.keys(tmp[i][j])[0])
                }

                j_numeric += 1
            }
            i_numeric += 1
        }
        // console.log("tmp2: ", tmp2)
        // console.log("tmp2[1][0]: ", tmp2[8].length)
        ///
        let tmp2_T = transpose_2d(tmp2)
        // console.log("transpose tmp2: ", tmp2_T)


        // var new_parser_test = await this.parseXmlnew(xml)
        // console.log("new_parser_test: ", new_parser_test["elements"][0]["elements"])
        // console.log("new_parser_test extend: ", new_parser_test["elements"][0]["elements"])

        // console.log("new_parser_test: ", new_parser_test)
        // this.setState({new_parser_test: new_parser_test})






        // console.log('L@@K HERE - result: ',result);
        // console.log('L@@K HERE - Dates: ',dates);
        // console.log('L@@K HERE - tmp2_T: ',tmp2_T);
        // console.log("Array Keys:", result.keys());
        //return result2;
        // return await [result2, dates];
        return await {data: tmp2_T,
            dates: dates};

    } catch (err) {
        console.error("parseXml failed: ", err);
    }
}



function flatten(object){
    // this._data =
    // console.log("Object: ", object)
    // console.log("Object keys: ", Object.values(object).flat())
    // console.log("test object length: ", object.length)

    let dates1 = []
    let object2 = Object.values(object).flat()
    for (var i in Object.keys(object2)) {
        pop(object2[i],"id")
        for (var j in Object.keys(object2[i])) {
            dates1.push(object2[i][j][Object.keys(object2[i][j])[0]])
        }
    }
    // console.log("dates1: ", dates1)

    // comment out
    // dates1 = dates1.map((element) => new Date(element));

    return dates1;
};


// async getAlunoArrayAsync(product, self)  {
//     var pagina
//     var array_de_urls=[]
//     for (pagina=0; pagina <=27; pagina++) {
//         array_de_urls.push('https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data='+product+'&field_tdr_date_value=all&page='+pagina)
//     }
//
//     Promise.all(array_de_urls.map(async (item) => ({
//         data: await axios.get(item).then(response => response.data)
//     }))).then(data => Promise.all(data.map(data => this.testXmlParse2(data.data)))).then((results) => {
//         this.setState({
//                 dates: this.flatten(results.map((o) => o.dates)),
//                 test2: results.map((o) => o.data).flat()
//             }
//         );
//     });
// }








export default function Plotly_Test_Func() {

    const {startDatePlotly, setStartDatePlotly,
            endDatePlotly, setEndDatePlotly,
            minDatePlotly, setMinDatePlotly,
            maxDatePlotly, setMaxDatePlotly} = CryptoState()

    const [parsedDate, setParsedDate] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [plotlyDates, setPlotlyDates] = useState([]);
    const [plotlyData, setPlotlyData] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchYieldCurve = async () => {
        var product = ['daily_treasury_yield_curve']
        // var product = ['daily_treasury_bill_rates']
        var pagina
        var urlList=[]
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        for (pagina=0; pagina <=27; pagina++) {
            urlList.push(PROXY_URL + 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data='+product+'&field_tdr_date_value=all&page='+pagina)
        }

        Promise.all(urlList.map(async (item) => ({
            data: await axios.get(item).then(response => response.data)
        }))).then(data => Promise.all(data.map(data => testXmlParse2(data.data))))
            .then((results) => {
                setPlotlyDates(flatten(results.map((o) => o.dates)));
                setPlotlyData(results.map((o) => o.data).flat());
                setParsedDate(flatten(results.map((o) => o.dates)));
                setParsedData(results.map((o) => o.data).flat());
        });


        // setStartDatePlotly(plotlyDates.minDate)
        // setEndDatePlotly(plotlyDates.maxDate)

        setLoading(false);
    };


    useEffect(() => {
        fetchYieldCurve();
        // drawChart(coins);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    console.log("plotlyData", plotlyData)
    console.log("plotlyDates", plotlyDates)

    const getAvailableDates = (data) => {
        // const dates = {};
        // Object.keys(data).forEach(coin => {
        //     dates[coin] = data[coin].map(d => d['date']);
        // })
        // dates['FRED'] = data.map(d => d['date']);
        //
        // console.log("getAvailableDates dates: ", dates);
        // console.log("dates.at(0)).toISOString().slice(0, 10): ", (dates['FRED'].at(0)));

        console.log("plotlyDates L@@K", plotlyDates)
        // setMinDatePlotly(new Date(plotlyDates.at(0)).toISOString().slice(0, 10))
        // setMaxDatePlotly(new Date(plotlyDates.at(-1)).toISOString().slice(0, 10))
        // setMinDatePlotly(new Date(plotlyDates.at(0)).toISOString().slice(0, 10))
        // setMaxDatePlotly(new Date(plotlyDates.at(-1)).toISOString().slice(0, 10))
        // setStartDatePlotly(new Date(plotlyDates.at(0)).toISOString().slice(0, 10))
        // setEndDatePlotly(new Date(plotlyDates.at(-1)).toISOString().slice(0, 10))
        // console.log("plotlyDates.at(1)", plotlyDates.at(0))
        // console.log("plotlyDates.at(-1)", plotlyDates.at(-1))
        // console.log("setMinDatePlotly L@@K", minDatePlotly)
        // console.log("setMaxDatePlotly L@@K", maxDatePlotly)

        return {
            'minDate' : new Date(plotlyDates.at(0)).toISOString().slice(0, 10),
            'maxDate' : new Date(plotlyDates.at(-1)).toISOString().slice(0, 10),
            'startDate' : new Date(plotlyDates.at(0)).toISOString().slice(0, 10),
            'endDate' : new Date(plotlyDates.at(-1)).toISOString().slice(0, 10)

        };
    };



    useEffect(() => {
        if(plotlyDates != undefined && plotlyDates.length != 0) {
            // getAvailableDates(plotlyDates)
            let dateObjects = getAvailableDates()

            setMinDatePlotly(dateObjects.minDate)
            setMaxDatePlotly(dateObjects.maxDate)
            setStartDatePlotly(dateObjects.startDate)
            setEndDatePlotly(dateObjects.endDate)
        }


    }, [plotlyDates]);



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
        // console.log("startDate - second: ", startDatePlotly.toString())
        // console.log("startDate: ", new Date (startDate))


        // const test2 = plotlyDates.findIndex(d =>
        //     new Date(d).getTime() >= new Date (startDatePlotly).getTime());
        // // const test = plotlyDates.findIndex(function(x) {
        // //     return x.valueOf() === startDatePlotly.valueOf();
        // // })
        // console.log("test2: ", test2)









        const dateTimeFiltered = plotlyDates
            ?.filter(d =>
                new Date(d).getTime() >= new Date (startDatePlotly).getTime()
                && new Date(d).getTime() <= new Date(endDatePlotly).getTime());
        console.log("filter test: ", dateTimeFiltered)
        // console.log("filter index: ", dateTimeFiltered)

        // const dateTimeFiltered2 = plotlyDates
        //     ?.filter((d, index) =>
        //         new Date(plotlyDates[index]).getTime() >= new Date (startDatePlotly).getTime()
        //         && new Date(plotlyDates[index]).getTime() <= new Date(endDatePlotly).getTime());
        // console.log("filter test new: ", dateTimeFiltered)
        // // console.log("filter test index new: ", dateTimeFiltered.index)
        // console.log(dateTimeFiltered[0])
        // console.log(dateTimeFiltered[dateTimeFiltered.length - 1])
        console.log("indexOf", plotlyDates.indexOf(dateTimeFiltered[0]), plotlyDates.indexOf(dateTimeFiltered[dateTimeFiltered.length - 1]))
        //
        //
        // console.log("stack suggestion",new Date(Math.max.apply(null, dateTimeFiltered.map(function(e) {
        //     return new Date(e);
        // }))));

        // const testmin = plotlyDates.findIndex(d =>
        //     new Date(d).getTime() >= new Date (new Date(Math.min.apply(null, dateTimeFiltered.map(function(e) {
        //         return new Date(e);
        //     })))).getTime());
        //
        //
        // const testmax = plotlyDates.findIndex(d =>
        //     new Date(d).getTime() >= new Date (Math.max.apply(null, dateTimeFiltered.map(function(e) {
        //         return new Date(e);
        //     }))).getTime());
        //
        //
        // console.log("stack suggestion", testmin,testmax);
        // console.log("stack suggestion v2", dateTimeFiltered)
        // console.log("stack suggestion v2", plotlyData.slice(testmin,testmax))
        setParsedDate(dateTimeFiltered)
        setParsedData(plotlyData.slice(plotlyDates.indexOf(dateTimeFiltered[0]),plotlyDates.indexOf(dateTimeFiltered[dateTimeFiltered.length - 1])))
        console.log("setParsedData", parsedData)

    }, [startDatePlotly, endDatePlotly]);





    if (loading) {
        return <div>loading...</div>;
    }


    console.log("Final Z:", parsedData)
    console.log("Final y:", parsedDate)



    const tener = ['3-month', '6-month', '1-year', '2-year', '3-year', '5-year', '7-year', '10-year', '30-year']
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

            <Plot
                data={[
                    {
                        type: "surface",
                        z: parsedData,
                        x: tener,
                        y: parsedDate,
                        colorscale: [
                            ['0.0', 'rgb(165,0,38)'],
                            ['0.111111111111', 'rgb(215,48,39)'],
                            ['0.222222222222', 'rgb(244,109,67)'],
                            ['0.333333333333', 'rgb(253,174,97)'],
                            ['0.444444444444', 'rgb(254,224,144)'],
                            ['0.555555555556', 'rgb(224,243,248)'],
                            ['0.666666666667', 'rgb(171,217,233)'],
                            ['0.777777777778', 'rgb(116,173,209)'],
                            ['0.888888888889', 'rgb(69,117,180)'],
                            ['1.0', 'rgb(49,54,149)']
                        ],
                    }
                ]}
                layout={{
                    scene: {
                        xaxis: {
                            type: 'category',
                            title: '',
                            showgrid: true,
                            zeroline: false,
                            automargin: true
                        },
                        yaxis: {
                            type: 'date',
                            title: '',
                            showgrid: true,
                            zeroline: false,
                            autorange:'reversed',
                            automargin: true
                        },
                        zaxis: {
                            title: 'Yield',
                            showgrid: true,
                            zeroline: false,
                            ticksuffix: '%',
                        },
                        camera: {
                            up: {
                                x: 0,
                                y: 0,
                                z: 1
                            },
                            eye: {
                                // x: -2.7240994015123916,
                                // y: -0.03291896385836754,
                                // z: 1.2812564553231525
                                x: -2.7240994015123916,
                                y: -0.1291896385836754,
                                z: 2.2812564553231525
                            },
                            center: {
                                x: 0,
                                y: 0,
                                z: 0
                            }
                        },
                        aspectmode: 'manual',
                        aspectratio: {
                            x: 1,
                            y: 4,
                            z: 2
                        }
                    },
                    // title: 'US Treasury Yield Curve',
                    // width: 1000,
                    // height: 666,
                    // margin: {
                    //     b: 60,
                    //     l: 20,
                    //     r: 20,
                    //     t: 60,
                    //     pad: 4
                    // },
                    autosize: true,
                    // automargin: true,
                    // showlegend: false
                }}
                config = {{responsive: true}}

            />
        </div>
    );
}
// config = {{responsive: true}}
// useResizeHandler= {true}
// style= {{width: "100%", height: "100%"}}

// const [pokeList, setPokeList] = useState([]);
// useEffect(() => {
//     const temp = async () => {
//         let r = await axios.get("https://pokeapi.co/api/v2/pokemon/");
//         let urlList = [];
//         r.data.results.forEach((element) => {
//             urlList.push(`https://pokeapi.co/api/v2/pokemon/${element.name}`);
//         });
//         let datas = await Promise.all(urlList.map((x) => axios.get(x)));
//         let list = [];
//         console.log("DD", datas);
//
//         datas.forEach((x) => {
//             list.push({ name: x.data.name, height: x.data.height });
//         });
//         setPokeList(list);
//     };
//     temp();
// }, []);
//
// return (
//     <div>
//         <h1>Hello CodeSandbox</h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <table>
//             <tbody>
//             <tr>
//                 <td> Name </td>
//                 <td> Height </td>
//             </tr>
//             {pokeList.map((el) => (
//                 <tr key={el.id}>
//                     <td>{el.name} </td>
//                     <td>{el.height} </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     </div>
// );
// }