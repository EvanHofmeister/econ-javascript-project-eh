import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from "@mui/material/styles";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App />
// );


import CryptoContextAPI from "./SeriesContextAPI";


const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CryptoContextAPI>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>,
        </CryptoContextAPI>
    </React.StrictMode>,
    document.getElementById("root")
);