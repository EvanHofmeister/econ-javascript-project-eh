export default {
  API_KEY : 'ac95f4955bcea62d846c5eea3adbddee',
  BASE_URL : 'http://api.stlouisfed.org/fred/series/',
  SERIES_ID : {
	shaded : 'WM2NS',
	bar : 'GDPCA',
	line : 'DGS10-T10YIE'
  },
  API_OPTIONAL_PARAMS : {
	GDPCA : {
		frequency  : 'a',
		aggregation_method : 'avg'
	},
	WM2NS : {
		frequency  : 'a',
		aggregation_method : 'avg'
	},
	DGS10 : {
		frequency  : 'a',
		aggregation_method : 'avg'
	},
	T10YIE : {
		frequency  : 'a',
		aggregation_method : 'avg'		
	}
  }
  
};