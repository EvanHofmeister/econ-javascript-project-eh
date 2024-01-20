import * as d3 from "d3";
import { useEffect, useState } from "react";
import { FormSelectors } from "./FormSelectors";
import { Line } from './Line';
import HomePage from './pages/HomePage'
// import { styled, createTheme, ThemeProvider } from '@mui/system';
import {makeStyles} from "@material-ui/core/styles";
// import cors from
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

//
// const cors = require("cors");
//
// App.options("*", cors({ origin: 'http://localhost:3006', optionsSuccessStatus: 200 }));
//
// App.use(cors({ origin: "http://localhost:3006", optionsSuccessStatus: 200 }));

// const options = {
//   margin: { left: 100, right: 100, top: 50, bottom: 100 },
//   size: { width: 1000, height: 400 },
//   labelsPositions: { xAxis: { x: 0, y: -10 }, yAxis: { x: 10, y: 20 } },
//   labelsText: { xAxis: "year", yAxis: "value ($)" },
//   labelsClasses: { xAxis: "x-axisLabel", yAxis: "y-axisLabel" },
//   tooltipContainer: { width: 120, height: 40, x: -60, y: -50 },
//   tooltipTextPositions: { xAxis: { x: -53, y: -35 }, yAxis: { x: -53, y: -19 } },
//   tooltipTextsLabels: { xBefore: "Date: ", xAfter: "", yBefore: "Value:  ", yAfter: " ($)" },
//   lineClass: "line2",
//   lineColor: 'red',
//   zoomEnabled: true,
//   tooltipEnabled: true,
//   xDateScale: true,
// };
//
// const parseTime = d3.timeParse("%d/%m/%Y");

// const customTheme = createTheme({
//     palette: {
//         primary: {
//             main: '#1976d2',
//             contrastText: 'white',
//         },
//     },
// });
//
// const MyThemeComponent = styled('div')(({ theme }) => ({
//     color: theme.palette.primary.contrastText,
//     backgroundColor: theme.palette.primary.main,
//     padding: theme.spacing(1),
//     borderRadius: theme.shape.borderRadius,
// }));


const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: "whitre",
        color: "white",
        minHeight: "100vh",
    },
}));




function App() {
    const classes = useStyles();

    // const classes = MyThemeComponent();
  // const [data, setData] = useState(null);
  // const [parsedData, setParsedData] = useState(null);
  // const [formData, setFormData] = useState({
  //   coin: 'bitcoin',
  //   var: 'price_usd',
  //   minDate: new Date().toISOString().slice(0, 10),
  //   maxDate: new Date().toISOString().slice(0, 10)
  // });
  //
  // const [availableDates, setAvailableDates] = useState({});
  // useEffect(() => {
  //   // d3.json("http://localhost:3006/data/coins.json",
  //   d3.json("./data/coins.json",
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     }).then(data => {
  //       if (!data) return;
  //       const dataCopy = JSON.parse(JSON.stringify(data));
  //
  //       Object.keys(dataCopy).forEach(id => {
  //         dataCopy[id] = dataCopy[id]
  //           .filter(d => (d['24h_vol'] && d['market_cap'] && d['price_usd'] && d['date']))
  //           .map(d => {
  //             d['24h_vol'] = Number(d['24h_vol']);
  //             d['market_cap'] = Number(d['market_cap']);
  //             d['price_usd'] = Number(d['price_usd']);
  //             d['date'] = parseTime(d['date']);
  //             return d
  //           })
  //       });
  //
  //       console.log('dataCopy', dataCopy)
  //       setData(dataCopy);
  //       setParsedData(dataCopy);
  //       getAvailableDates(dataCopy);
  //
  //
  //       // console.log("data : ",data)
  //       // console.log("parsedData : ",parsedData)
  //       // console.log("formData : ",formData)
  //       // console.log("availableDates : ",availableDates)
  //     console.log("ORIGINAL dataCopy : ", dataCopy);
  //     console.log("ORIGINAL options : ", options);
  //     console.log("ORIGINAL formavailableDatesData : ", availableDates);
  //     console.log("ORIGINAL formData : ", formData);
  //     console.log("ORIGINAL setFormData : ", setFormData);
  //     console.log("ORIGINAL formData.var : ", formData.var);
  //
  //
  //     });
  //   return () => undefined;
  // }, []);
  //
  // const getAvailableDates = (data) => {
  //   const dates = {};
  //   Object.keys(data).forEach(coin => {
  //     dates[coin] = data[coin].map(d => d['date']);
  //   })
  //
  //   setAvailableDates(dates);
  //
  //   setFormData({
  //     ...formData,
  //     ...(dates[formData.coin].at(0) && { minDate: new Date(dates[formData.coin].at(0)).toISOString().slice(0, 10) }),
  //     ...(dates[formData.coin].at(0) && { maxDate: new Date(dates[formData.coin].at(-1)).toISOString().slice(0, 10) })
  //   })
  // };
  //
  // const updateData = ({ name, value }) => {
  //   const coinData = data[formData.coin];
  //   const minDateToFilter = name === 'minDate' ? value : formData.minDate;
  //   const maxDateToFilter = name === 'maxDate' ? value : formData.maxDate;
  //
  //   console.log("App Coin Data: ", coinData)
  //   const dataTimeFiltered = coinData
  //     .filter(d =>
  //       new Date(d['date']).getTime() >= new Date(minDateToFilter).getTime()
  //       && new Date(d['date']).getTime() <= new Date(maxDateToFilter).getTime());
  //
  //   setParsedData({
  //     ...parsedData,
  //     [formData.coin]: dataTimeFiltered
  //   });
  // };
  //
  // // const fetchCoins = async () => {
  // //   // setLoading(true);
  // //   const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  // //   const URL = 'https://api/entries';
  // //
  // //   const {data} = await axios.get(PROXY_URL + "https://api.stlouisfed.org/fred/series/observations?file_type=json&api_key=ac95f4955bcea62d846c5eea3adbddee&series_id=WM2NS&observation_start=1999-08-14&observation_end=2019-08-13");
  // //   console.log("Fetch Coin Return", data);
  // //   // console.log("Fetch Coin Return", type);
  // //
  // // };
  // //
  // // useEffect(() => {
  // //       fetchCoins();
  // //       // drawChart(coins);
  // //       // eslint-disable-next-line react-hooks/exhaustive-deps
  // //   }, []);






  return (
    <div className={classes.App}>
      <HomePage/>
    </div>
  );
}

export default App;
