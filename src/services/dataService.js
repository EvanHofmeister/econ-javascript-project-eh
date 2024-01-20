import axios from 'axios';
import config from '../config/config';

function getObservationsBySeriesId(seriesId, startTime, endTime, optionParams){
	startTime = startTime || '1999-08-14';
	endTime = endTime || '2019-08-13';
	var optionals = config['API_OPTIONAL_PARAMS'][seriesId];
	let url = `http://api.stlouisfed.org/fred/series/observations?file_type=json&api_key=${config.API_KEY}&series_id=${seriesId}&observation_start=${startTime}&observation_end=${endTime}`;
	if(optionals){
		for(var param in optionals){
			url += '&'+param+'='+optionals[param];
		}
	}
	console.log("URL: ", url)
  	return axios.get(url).then(response => response.data);
}

function getTreasuryProduct(product, optionParams){
	let url = `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=${product}&field_tdr_date_value=all&page=0`;
	//console.log("Data", axios.get(url).then(response => response.data));
	return axios.get(url).then(response => response.data);
}

export const CoinList = (seriesId, startTime, endTime, optionParams) =>
	`http://api.stlouisfed.org/fred/series/observations?file_type=json&api_key=${config.API_KEY}&series_id=${seriesId}&observation_start=${startTime}&observation_end=${endTime}`;




export { getObservationsBySeriesId, getTreasuryProduct }