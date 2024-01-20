import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

// import Graphs from "./components/PlotlyGraph";
// import * as d3 from "d3";
// import Plot from 'react-plotly.js';

// import Dropdown from '../components/Dropdown'
// import Graph from '../components/Graph'
// import Date from '../components/Date'

import Tests from "../Test";
import Plotly_Test_Func from "../Plotly_Test"


import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Tabs,
    Tab,
    TextField,
    MuiThemeProvider,
    Button,
    Grid,
    Paper,
    Divider, InputLabel, FormControl
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import { Avatar } from '@material-ui/core';

// import { makeStyles } from "@mui/core"
import {Box, styled} from '@mui/system';
import Link from '@mui/material/Link';

import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
// or for Day.js
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Button } from "@mui/material";

// import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
// import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import fed_logo from "../Thumbnails/us_fed_logo.png";
import treasury_logo from "../Thumbnails/us_treasury_logo.png";






import Graph_2 from "../Graph_2";
// import { makeStyles } from '@mui/styles';


// import Graph_2 from "../components/Graph_2";
import { CryptoState } from "../SeriesContextAPI";
import {deepOrange} from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
// import { makeStyles } from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.ehofmeister.com/">
                ehofmeister.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}





function TabPanel(props)
{
    const {children, value, index} = props;
    return (<div>
        {
            value===index && (
                <h1>{children}</h1>
            )
        }
    </div>)
};


// const MyThemeComponent = styled((theme) => ({
//     customLabelColor: {
//         color: "white",
//         backgroundColor: "#0077b6"
//     },
//     tabLabelColor: {
//         color: "white",
//     }
// }));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#0077b6",
        },
        type: "light",
    },
    overrides: {
        // Applied to the <ul> element
        MuiMenu: {
            list: {
                backgroundColor: "red",
            },
        },
        // Applied to the <li> elements
        MuiMenuItem: {
            root: {
                fontSize: 12,
            },
        },
    },
});


const useStyles = makeStyles({
    customLabelColor: {
        backgroundColor: "pink",
        color: "red",
        // fontFamily: "Inter",
        // fontWeight: "bold",
        // cursor: "pointer",
    },
    appBarStyle: {
        flexGrow: 1,
        fontWeight: 700,
        backgroundColor: "#FFFFFF"
    },
    tabLabelColor: {
        color: "red",
    },
    avatarStyle: {
        height: 50,
        width: 50,
        variant: 'square'
    },
    paper: {
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        textAlign: "left",
        verticalAlign: "left",
        boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        elevation: 12
    },
    selectStyle: {
        width: 160,
        height: 50,
        color: "Black",
        borderColor: 'lightgray',
        backgroundColor: "#fff",
        '&:hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
        }
    },
    buttonStyle: {
        width: 160,
        height: 40, //40,
        textTransform: 'none',
        color: "Black",
        borderColor: 'lightgray',
        backgroundColor: "#fff",
        '&:hover': {
            border: '1.6px solid',
            backgroundColor: '#fff',
            color: '#3c52b2',
        }
    },
    datePickerStyle: {
        root: {
            width: 100,
            height: 40,
            color: "Black",
            borderColor: 'lightgray',
            backgroundColor: "#fff",
            '&:hover': {
                backgroundColor: '#fff',
                color: '#3c52b2',
            }
        }
    }
});

// const useStyles = styled(() => ({
//     customLabelColor: {
//         backgroundColor: "pink",
//         color: "red",
//         // fontFamily: "Inter",
//         // fontWeight: "bold",
//         // cursor: "pointer",
//     },
//     tabLabelColor: {
//         color: "red",
//     },
//     avatarColor: {
//         size: 10,
//         variant: 'square'
//     },
//     paper: {
//         display: "flex",
//         justifyContent: "right",
//         alignItems: "right",
//         textAlign: "right",
//         verticalAlign: "right",
//         // boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.25)",
//         // borderRadius: "25px",
//         // elevation: 24
//     },
//     selectStyle: {
//         style: {width: 160, height: 40}
//     }
// }));




const Homepage = () => {
    // const [allValues, setAllValues] = React.useState({
    //     fred_series:'WM2NS',
    //     type:'line',
    //     from:'1999-08-14',
    //     to:'2019-08-13',
    //     list:[ { name : 'T10Y2Y: `lot line area chart (shaded line chart)', type: 'shaded'}, { name : 'GDPCA: plot bar chart for the last 20 years', type:'bar'}, { name : 'DGS10 minus T10YIE: plot line chart', type:'line' }]
    //     });

    // const classes = useStyles();

    // const { currencyVars, typeVars } = CryptoState();
    // const { currency, setCurrency } = currencyVars;
    // const { type, setType } = typeVars;
    const [value, setValue] = React.useState(0);
    // const classes = MyThemeComponent();
    const handleChange=(e,value)=>{
        console.warn(value)
        setValue(value)
    };


    const {currency, setCurrency,
        treasurySeries, setTreasurySeries,
        symbol, type, setType,
        description,
        seriesName,
        startDate, setStartDate,
        endDate, setEndDate,
        minDate, setMinDate,
        maxDate, setMaxDate,
        startDatePlotly, setStartDatePlotly,
        endDatePlotly, setEndDatePlotly,
        minDatePlotly, setMinDatePlotly,
        maxDatePlotly, setMaxDatePlotly,
        resetParameters, setResetParameters} = CryptoState();

    const classes = useStyles();

    // console.log("currency", currency);
    // const handleChange = (e, value) => {
        //     setAllValues({...allValues, [e.target.name]: e.target.value})
        //     console.log("new value", e.target.value);
        //     console.log("global const value: ", allValues);
        //
        // };


        // const history = useNavigate();

        // const updateInputDate=(key,evt)=>{
        //     var value = evt.target.value;
        //     var obj = {};
        //     obj[key] = value ;
        //     this.setState((state) => obj);
        // };

    const handleResetClick = () => {
        setStartDate(minDate)
        setEndDate(maxDate)
    }

    const handleResetClickPlotly = () => {
        setStartDatePlotly(minDatePlotly)
        setEndDatePlotly(maxDatePlotly)
    }

        return (
            <ThemeProvider theme={darkTheme}>
            <div>
                {/*<AppBar position={"static"} sx={{ flexGrow: 1, fontWeight: 700, backgroundColor: "transparent" }}>*/}
                <AppBar position={"static"} className={classes.appBarStyle}>
                    <Tabs
                        value={value}
                        onChange={handleChange}

                        TabIndicatorProps={{
                            style: {
                                background: "#0077b6",
                                // height: "10px",
                                // top: "35px",
                                color: "#0077b6",
                                fontFamily: "Inter",
                                fontWeight: "bold",
                                // backgroundColor: "#59f62d"
                            }
                        }}



                    >

                        {/*<Tab label="St. Louis FRED" icon={<Avatar src={fed_logo} sx={{ height: 7, width: 7 }}/>}*/}
                        {/*<Tab label="Treasury - Yield Curve" icon={<Avatar src={treasury_logo} sx={{ height: 7, width: 7 }}/>}/>*/}
                        {/*<Tab label="About" icon={<Avatar sx={{ height: 7, width: 7, bgcolor: deepOrange[500] }}>?</Avatar>}/>*/}

                        <Tab label="St. Louis FRED" icon={<Avatar src={fed_logo} className={classes.avatarStyle}/>}/>
                        <Tab label="Treasury - Yield Curve" icon={<Avatar src={treasury_logo} className={classes.avatarStyle}/>}/>
                        <Tab label="About" icon={<Avatar className={classes.avatarStyle}>?</Avatar>}/>
                    </Tabs>
                </AppBar>
                {/*<Tests/>*/}

                {/*className="App">*/}


                {/*onClick={() => history.push(`/`)}*/}
                {/*<Button color="inherit">Login</Button> */}
                <TabPanel value={value} index={0}>


                    {/*<Stack*/}
                    {/*    sx={{ pt: 4 }}*/}
                    {/*    direction="row"*/}
                    {/*    spacing={.05}*/}
                    {/*    justifyContent="center"*/}
                    {/*>*/}
                    <Container maxWidth="xs">
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={6}>
                            <FormControl>
                                <InputLabel>Series ID</InputLabel>
                                <Select
                                    label='Series ID'
                                    // labelWidth={ "text".length * 9}
                                    variant="outlined"
                                    value={currency}
                                    // style=classes.selectStyle
                                    className={classes.selectStyle}
                                    // style={{width: 160, height: 40}}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <MenuItem value={"T10Y2Y"}>T10Y2Y</MenuItem>
                                    <MenuItem value={"T10Y3M"}>T10Y3M</MenuItem>
                                    <MenuItem value={"FEDFUNDS"}>FEDFUNDS</MenuItem>
                                    <MenuItem value={"DPCREDIT"}>DPCREDIT</MenuItem>
                                    <MenuItem value={"SOFR"}>SOFR</MenuItem>
                                    <MenuItem value={"LIOR3M"}>LIOR3M</MenuItem>
                                    <MenuItem value={"RRPONTSYD"}>RRPONTSYD</MenuItem>
                                    <MenuItem value={"M2SL"}>M2SL</MenuItem>
                                    <MenuItem value={"M1SL"}>M1SL</MenuItem>
                                    <MenuItem value={"M2V"}>M2V</MenuItem>
                                    <MenuItem value={"BAMLH0A0HYM2"}>BAMLH0A0HYM2</MenuItem>
                                    <MenuItem value={"BAMLC0A4CBBB"}>BAMLC0A4CBBB</MenuItem>
                                    <MenuItem value={"DAAA"}>DAAA</MenuItem>
                                    <MenuItem value={"DBAA"}>DBAA</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                            <Box>
                                <Button
                                    // aria-label='Reset'
                                    sx={{p:3}}
                                    variant="outlined"
                                    className={classes.buttonStyle}
                                    onClick={(e) => handleResetClick()}
                                >
                                    Reset Dates
                                </Button>
                            </Box>
                            </Grid>


                            {/*<Select*/}
                            {/*    variant="outlined"*/}
                            {/*    labelId="demo-simple-select-label"*/}
                            {/*    id="demo-simple-select"*/}
                            {/*    value={type}*/}
                            {/*    style={{ width: 100, height: 40, marginLeft: 15 }}*/}
                            {/*    onChange={(e) => setType(e.target.value)}*/}
                            {/*    name="type"*/}
                            {/*>*/}
                            {/*    <MenuItem value={"shaded"}>shaded</MenuItem>*/}
                            {/*    <MenuItem value={"bar"}>bar</MenuItem>*/}
                            {/*    <MenuItem value={"line"}>line</MenuItem>*/}
                            {/*</Select>*/}

                            {/*<Dropdown list={value.list} onChange={handleChange}/>*/}
                            {/*<Date onChange={updateInputDate.bind(this)} from={allValues.from} to={allValues.to} />*/}
                            {/*<Graph fred_series={allValues.fred_series} type={allValues.type} from={allValues.from} to={allValues.to} onChange={handleChange}/>*/}

                            <Grid item xs={6}>
                            {/*<div>Date: {startDate.toString()}</div>*/}
                            <React.Fragment>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label='Start Date'
                                    value={startDate}
                                    onChange={(e) => {setStartDate(e)}}
                                    // onChange={setStartDate}
                                    minDate={minDate}
                                    maxDate={endDate}
                                    // renderInput={(params) => <TextField {...params} />}
                                    renderInput={(params) => <TextField sx={{width: 160, height: 20}} {...params} />}

                                />
                            </LocalizationProvider>
                            </React.Fragment>
                            </Grid>

                            <Grid item xs={6}>
                            {/*<div>Date: {endDate.toString()}</div>*/}
                            <React.Fragment>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label='End Date'
                                        value={endDate}
                                        onChange={(e) => {setEndDate(e)}}
                                        minDate={startDate}
                                        maxDate={maxDate}
                                        // onChange={setDate}
                                        // renderInput={(params) => <TextField {...params} />}
                                        renderInput={(params) => <TextField sx={{width: 160, height: 20}} {...params} />}

                                    />
                                </LocalizationProvider>
                            </React.Fragment>
                            </Grid>
                        {/*<BannerText />*/}
                        {/*<div><Graph_2/></div>*/}


                        {/*</Stack>*/}
                        </Grid>

                    </Container>



                </TabPanel>

                {/*<h2>US Treasury Yield Curve</h2>*/}

                {/*<TabPanel value={value} index={1}>*/}
                {/*    /!*<Tests/>*!/*/}
                {/*    <Plotly_Test_Func/>*/}
                {/*</TabPanel>*/}





                <TabPanel value={value} index={1}>

                    <Container maxWidth="xs">
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={6}>
                                <FormControl>
                                    <InputLabel>Series ID</InputLabel>
                                    <Select
                                        label='Series ID'
                                        // labelWidth={ "text".length * 9}
                                        variant="outlined"
                                        value={treasurySeries}
                                        // style=classes.selectStyle
                                        className={classes.selectStyle}
                                        // style={{width: 160, height: 40}}
                                        onChange={(e) => setTreasurySeries(e.target.value)}
                                    >
                                        <MenuItem value={"daily_treasury_yield_curve"}>Yield Curve</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <Box>
                                    <Button
                                        // aria-label='Reset'
                                        sx={{p:3}}
                                        variant="outlined"
                                        className={classes.buttonStyle}
                                        onClick={(e) => handleResetClickPlotly()}
                                    >
                                        Reset Dates
                                    </Button>
                                </Box>
                            </Grid>


                            {/*<Select*/}
                            {/*    variant="outlined"*/}
                            {/*    labelId="demo-simple-select-label"*/}
                            {/*    id="demo-simple-select"*/}
                            {/*    value={type}*/}
                            {/*    style={{ width: 100, height: 40, marginLeft: 15 }}*/}
                            {/*    onChange={(e) => setType(e.target.value)}*/}
                            {/*    name="type"*/}
                            {/*>*/}
                            {/*    <MenuItem value={"shaded"}>shaded</MenuItem>*/}
                            {/*    <MenuItem value={"bar"}>bar</MenuItem>*/}
                            {/*    <MenuItem value={"line"}>line</MenuItem>*/}
                            {/*</Select>*/}

                            {/*<Dropdown list={value.list} onChange={handleChange}/>*/}
                            {/*<Date onChange={updateInputDate.bind(this)} from={allValues.from} to={allValues.to} />*/}
                            {/*<Graph fred_series={allValues.fred_series} type={allValues.type} from={allValues.from} to={allValues.to} onChange={handleChange}/>*/}

                            <Grid item xs={6}>
                                {/*<div>Date: {startDate.toString()}</div>*/}
                                <React.Fragment>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label='Start Date'
                                            value={startDatePlotly}
                                            onChange={(e) => {setStartDatePlotly(e)}}
                                            // onChange={setStartDatePlotly}
                                            minDate={minDatePlotly}
                                            maxDate={endDatePlotly}
                                            renderInput={(params) => <TextField sx={{width: 160, height: 20}} {...params} />}

                                        />
                                    </LocalizationProvider>
                                </React.Fragment>
                            </Grid>

                            <Grid item xs={6}>
                                {/*<div>Date: {endDate.toString()}</div>*/}
                                <React.Fragment>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label='End Date'
                                            value={endDatePlotly}
                                            onChange={(e) => {setEndDatePlotly(e)}}
                                            minDate={startDatePlotly}
                                            maxDate={maxDatePlotly}
                                            renderInput={(params) => <TextField sx={{width: 160, height: 20}} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </React.Fragment>
                            </Grid>
                            {/*<BannerText />*/}
                            {/*<div><Graph_2/></div>*/}


                            {/*</Stack>*/}
                        </Grid>

                    </Container>


















                    {/*<Button*/}
                    {/*    aria-label='Reset'*/}
                    {/*    variant="outlined"*/}
                    {/*    id="demo-simple-select"*/}
                    {/*    style={{width: 100, height: 40, marginLeft: 15}}*/}
                    {/*    onClick={(e) => handleResetClickPlotly()}*/}

                    {/*>*/}
                    {/*    Outlined*/}
                    {/*</Button>*/}

                    {/*<div>Date: {startDatePlotly.toString()}</div>*/}
                    {/*<React.Fragment>*/}
                    {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                    {/*        <DatePicker*/}
                    {/*            label='Start DatePlotly'*/}
                    {/*            value={startDatePlotly}*/}
                    {/*            onChange={(e) => {setStartDatePlotly(e)}}*/}
                    {/*            // onChange={setStartDatePlotly}*/}
                    {/*            minDate={minDatePlotly}*/}
                    {/*            maxDate={endDatePlotly}*/}
                    {/*            renderInput={(params) => <TextField {...params} />}*/}
                    {/*        />*/}
                    {/*    </LocalizationProvider>*/}
                    {/*</React.Fragment>*/}

                    {/*<div>Date: {endDatePlotly.toString()}</div>*/}
                    {/*<React.Fragment>*/}
                    {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                    {/*        <DatePicker*/}
                    {/*            label='End DatePlotly'*/}
                    {/*            value={endDatePlotly}*/}
                    {/*            onChange={(e) => {setEndDatePlotly(e)}}*/}
                    {/*            minDate={startDatePlotly}*/}
                    {/*            maxDate={maxDatePlotly}*/}
                    {/*            // onChange={setDatePlotly}*/}
                    {/*            renderInput={(params) => <TextField {...params} />}*/}
                    {/*        />*/}
                    {/*    </LocalizationProvider>*/}
                    {/*</React.Fragment>*/}

                    {/*/!*<BannerText />*!/*/}
                    {/*/!*<div><Plotly_Test_Func/></div>*!/*/}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography>
                        This
                    </Typography>
                </TabPanel>

                <div style={{ display: value === 0? 'block': 'none'}}>
                    <Graph_2/>


                    <div>
                        <Divider />
                        <h1>{seriesName}</h1>
                        <Paper className={classes.paper} >
                            <Typography style={{whiteSpace: "pre-line"}}>
                                {description}
                            </Typography>
                        </Paper>

                    </div>

                </div>
                <div style={{ display: value === 1? 'block': 'none', justifyContent:'center', alignItems:'center'}}>
                    <div>
                    <Plotly_Test_Func/>
                    </div>

                    <Divider />
                    <h1>Yield Curve</h1>
                    <Paper className={classes.paper} >
                        <Typography style={{whiteSpace: "pre-line"}}>
                            The yield curve is a graphical representation of the relationship between the yields of bonds with different maturities. It plots the yield of bonds with different maturities on the vertical axis and the maturity of the bonds on the horizontal axis. The yield curve is often used to describe the relationship between short-term and long-term interest rates.
                            A normal yield curve slopes upward, which means that long-term interest rates are higher than short-term interest rates. This is because lenders demand a higher rate of return to compensate for the increased risk of lending money for a longer period of time. A flat or downward sloping yield curve, on the other hand, indicates that the market expects economic weakness and lower future inflation. An inverted yield curve, where short-term interest rates are higher than long-term interest rates, is seen as a signal of an impending recession.
                            The yield curve is also closely watched by central banks and policymakers, as changes in the shape of the yield curve can indicate changes in monetary policy and the health of the economy. For example, if the yield curve steepens, it may indicate that the central bank is tightening monetary policy, while a flattening yield curve may indicate that the central bank is easing monetary policy.
                        </Typography>
                    </Paper>
                </div>
                {/*<div><Graph_2/></div>*/}
                {/*<div><Plotly_Test_Func/></div>*/}
                {/*<Typography*/}
                {/*    component="div"*/}
                {/*    role="tabpanel"*/}
                {/*    hidden={value !== 0}*/}
                {/*    id={`simple-tabpanel-${0}`}*/}
                {/*    aria-labelledby={`simple-tab-${0}`}*/}
                {/*>*/}
                {/*    {<Box p={3}>{Graph_2}</Box>}*/}
                {/*</Typography>*/}


                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                    </Typography>
                    <Copyright />
                </Box>
            </div>
            </ThemeProvider>
        );
    }
export default Homepage;