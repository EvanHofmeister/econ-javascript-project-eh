import React, { useState, Component } from 'react';
import {getObservationsBySeriesId, getTreasuryProduct} from './services/dataService';
import config from "./config/config";

import * as d3 from "d3";
import axios from "axios";
import Plot from "react-plotly.js";

import xml2js from 'xml2js';
let parser = new xml2js.Parser({explicitChildren: true, preserveChildrenOrder:true, charsAsChildren: true, fallback: { "timers": false }});


class Tests extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            test1: [],
            test2: [],
            test3: [],
            dates: [],
            yieldCurve: [],
            data2: [],
            new_parser_test: []
        };
    }

    clearData() {
        this.setState({data : []});
    }

    parseXml(xmldata) {
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

    transpose_2d(original) {
        var copy = [];

        for (var i = 0; i < original.length; ++i) {
            // console.log("original.length", original.length)
            // copy[j]=[]
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

    async testXmlParse2(xml) {
        try {
            let data = await this.parseXml(xml)
            const data2 = data.feed["entry"]

            this.setState({data2: data2})

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
                this.pop(tmp[i],"id")
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
            let tmp2_T = this.transpose_2d(tmp2)
            // console.log("transpose tmp2: ", tmp2_T)


            // var new_parser_test = await this.parseXmlnew(xml)
            // console.log("new_parser_test: ", new_parser_test["elements"][0]["elements"])
            // console.log("new_parser_test extend: ", new_parser_test["elements"][0]["elements"])

            // console.log("new_parser_test: ", new_parser_test)
            // this.setState({new_parser_test: new_parser_test})






            // console.log('L@@K HERE - result: ',result);
            // console.log('L@@K HERE - Dates: ',dates);
            // console.log('L@@K HERE - result2: ',result2);
            // console.log("Array Keys:", result.keys());
            //return result2;
            // return await [result2, dates];
            return await {data: tmp2_T,
                dates: dates};

        } catch (err) {
            console.error("parseXml failed: ", err);
        }
    }


    pop(obj, key) {
        var val = obj[key];
        delete obj[key];
        return val;
    }

    flatten(object){
        // console.log("Object: ", object)
        // console.log("Object keys: ", Object.values(object).flat())
        // console.log("test object length: ", object.length)

        let dates1 = []
        let object2 = Object.values(object).flat()
        for (var i in Object.keys(object2)) {
            this.pop(object2[i],"id")
            for (var j in Object.keys(object2[i])) {
                dates1.push(object2[i][j][Object.keys(object2[i][j])[0]])
            }
        }
        // console.log("dates1: ", dates1)

        return dates1;
    };


    async getAlunoArrayAsync(product, self)  {
        var pagina
        var array_de_urls=[]
        for (pagina=0; pagina <=27; pagina++) {
            array_de_urls.push('https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data='+product+'&field_tdr_date_value=all&page='+pagina)
        }

        Promise.all(array_de_urls.map(async (item) => ({
            data: await axios.get(item).then(response => response.data)
        }))).then(data => Promise.all(data.map(data => this.testXmlParse2(data.data)))).then((results) => {
            this.setState({
                    dates: this.flatten(results.map((o) => o.dates)),
                    test2: results.map((o) => o.data).flat()
                }
            );
        });
    }

    fetchContentByType2(type, startDate, endDate){
        var ids = ['daily_treasury_yield_curve'],
            that = this;

        ids = ids.map((id) => {
            return this.getAlunoArrayAsync(id)
        });
    }

    componentDidMount() {
        this.fetchContentByType2(this.props.type, this.props.from, this.props.to);

    }

    // componentWillReceiveProps(nextProps ) {
    //     this.clearData();
    //     this.fetchContentByType(nextProps.type, nextProps.from, nextProps.to);
    //     //this.fetchContentByType2(nextProps.type, nextProps.from, nextProps.to);
    //
    //     // this.parseXml32(this.state.data);
    //     //this.parseXml(nextProps);
    // }

    render() {
        console.log("this.state.dates: ", this.state.dates)
        console.log("this.state.test2: ", this.state.test2)
        console.log("this.state.test1: ", this.state.test1)

        const tener = ['3-month', '6-month', '1-year', '2-year', '3-year', '5-year', '7-year', '10-year', '30-year']
        return (
            <Plot
                data={[
                    {
                        type: "surface",
                        z: this.state.test2,
                        x: tener,
                        y: this.state.dates,
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
                        },
                        yaxis: {
                            type: 'date',
                            title: '',
                            showgrid: true,
                            zeroline: false,
                            autorange:'reversed'
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
                                x: -2.7240994015123916,
                                y: -0.03291896385836754,
                                z: 1.2812564553231525
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
                    width: 1200,
                    height: 800,
                    margin: {
                        b: 60,
                        l: 20,
                        r: 20,
                        t: 60,
                        pad: 4
                    },
                    autosize: false,
                    showlegend: false
                }}
            />
        );
    }


}

export default Tests;

