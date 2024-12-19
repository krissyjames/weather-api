import React from "react";
import './App.css';
import axios from "axios";
import DeveloperNotes from "./developerNotes";
import Products from "./products";

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state= {
    lat: null,
    lon: null,
    temp: null,
    date: null,
    weather: null,
    temp2: null,
    date2: null,
    weather2: null,
    temp3: null,
    date3: null,
    weather3: null,
    developerNotes: [],
    storeProducts: []
  }
  }
 
async componentDidMount() {
  const test = await this.getCoordinatesWithAxios();
  const weath = await this.get3DayWeatherWithAxios();
  console.log("ressie", test)
this.setState({
  lat: res.data[0].lat, 
  lon: res.data[0].lon,
  temp: Math.floor(weath.data.list[0].main.temp),
  // date: day,
  weather: weath.data.list[0].weather[0].main,
  temp2: Math.floor(weath.data.list[8].main.temp),
  // date2: day2,
  weather2: weath.data.list[8].weather[0].main,
  temp3: Math.floor(weath.data.list[16].main.temp),
  // date3: day3,
  weather3: weath.data.list[16].weather[0].main, 
})
console.log("statehere", this.state);
  }



getCoordinatesWithAxios = async () => {
  let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  let city = "Canton";
  let stateCode = "Michigan";
  let countryCode = "US";
  let url = "http://api.openweathermap.org/geo/1.0/direct";


try {
  let res = await axios.get(`${url}?q=${city},${stateCode},${countryCode}&appid=${apiKey}`);
  if (res.statusText != "OK") {
    throw new Error(`Error: ${res.status} - ${res.statusText}`)
  } else if (res.statusText === "OK") {
     let newState = await this.setState({ 
      lat: res.data[0].lat, 
      lon: res.data[0].lon 
    })
    console.log("new state", newState);
    return this.get3DayWeatherWithAxios(res.data[0].lat, res.data[0].lon);
  }}
  
catch(error){
  console.log(error.message)
}
}
get3DayWeatherWithAxios = async (lat, lon) => {
  console.log("state again", this.state);
  console.log("weather firing");
  if ((lon === null) || (lat === null)) {
    return console.log("state null");
  }
  let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  let url = "http://api.openweathermap.org/data/2.5/forecast";
  console.log(lat);
  let res = axios.get(`${url}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
  res.then (res => {
    console.log("new res", res);
    console.log("status", res.statusText )
  
    if (res.statusText != "OK") {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    } else {
        let timestamp = res.data.list[0].dt_txt;
        let parsedDate = Date.parse(timestamp);
        let date = new Date(parsedDate);
        let day = date.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
        let timestamp2 = res.data.list[8].dt_txt;
        let parsedDate2 = Date.parse(timestamp2);
        let date2 = new Date(parsedDate2);
        let day2 = date2.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
        let timestamp3 = res.data.list[16].dt_txt;
        let parsedDate3 = Date.parse(timestamp3);
        let date3 = new Date(parsedDate3);
        let day3 = date3.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
        this.setState({
          temp: Math.floor(res.data.list[0].main.temp),
          date: day,
          weather: res.data.list[0].weather[0].main,
          temp2: Math.floor(res.data.list[8].main.temp),
          date2: day2,
          weather2: res.data.list[8].weather[0].main,
          temp3: Math.floor(res.data.list[16].main.temp),
          date3: day3,
          weather3: res.data.list[16].weather[0].main,
        });
console.log("check2", res.data);
  }}
)
res.catch(error => {
  console.log(error.message)})

}
  
getDocumentation = async () => {
  let url = "http://localhost:5000";
  try {
    let res = await axios.get(`${url}/documentation`);
    console.log(res.data);
    this.setState({
      developerNotes: res.data
    })
    console.log(this.state);
  } catch(error) {
    console.log(error.message);
  }
}

getProducts = async () => {
  let url = "http://localhost:5000";
  try {
    let res = await axios.get(`${url}/products`);
    console.log(res.data);
    this.setState({
      storeProducts: res.data
    })
    console.log(this.state);
  } catch(error) {
    console.log(error.message);
  }
}


  render() {
  return (
    <div>
      <div className="App">
        <h1>App</h1>
        {this.state.lon && this.state.lat &&
        <p>{`Lat: ${this.state.lat}, Lon: ${this.state.lon}`}</p>}
        {this.state.date && this.state.weather && this.state.temp &&
        <p>{`${this.state.date} - Weather Outlook: ${this.state.weather}, Temp: ${this.state.temp} degrees.`}</p>}
        {this.state.date2 && this.state.weather2 && this.state.temp2 &&
        <p>{`${this.state.date2} - Weather Outlook: ${this.state.weather2}, Temp: ${this.state.temp2} degrees.`}</p>}
        {this.state.date3 && this.state.weather3 && this.state.temp3 &&
        <p>{`${this.state.date3} - Weather Outlook: ${this.state.weather3}, Temp: ${this.state.temp3} degrees.`}</p>}
      </div>
      <div>
        <button onClick={this.getDocumentation}>Get Documentation</button>
        {this.state.developerNotes.map((note, index) => (
        <DeveloperNotes 
          key={index} 
          devNote={note}
          />
          ))}
      </div>
      <div>
        <button onClick={this.getProducts}>Get Products</button>
        {this.state.storeProducts.map((products, index) => (
          <Products
          key={index}
          product={products}
          />
        ))}
      </div>
    </div>
  );
}
}


export default App;
