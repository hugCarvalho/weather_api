## Weather App with 3 days forecast 
Displays weather data from *OpenWeather* API for the present day and for the next 2 days for every 3 hours. 

### Project specs
Built with React HOOKS, styled with SASS(scss)

#### Hooks used (appart from useState and useEffect...) 
- useReducer
- useContext
 
##### 3rd party used: 
- Moment 
- Tippy
- React-spinners

#### App functionalities
- search for a city to display the weather forecast
- display weather forecast for present day and next 2 days:
	- every 3 hours option
 	- temperature (actual + real feel) 
	- wind speed + wind direction (cardinal points + arrow pointer)
- save cities for fast access (up to 3 cities) in local storage
- set a city to load at startup

Verification: 
- empty input + not valid city (used API city not found error response)
- save city menu logic (diverse) 


