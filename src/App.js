import React from "react";
import './App.css';

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
    weather3: null

  }
  }
 
componentDidMount() {
  this.getCoordinatesWithFetch();
}


getCoordinatesWithFetch = async () => {
  let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  let city = "Canton";
  let stateCode = "Michigan";
  let countryCode = "US";
  let url = "http://api.openweathermap.org/geo/1.0/direct";

  try {
    let res = await fetch(`${url}?q=${city},${stateCode},${countryCode}&appid=${apiKey}`);
    console.log("res", res);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
    let data= await res.json();
    console.log("data", data);
   this.setState({ 
    lat: data[0].lat, 
    lon: data[0].lon 
  })

  } catch (error) {
    console.log(error.message);

  }
  this.get3DayWeatherWithFetch();
}
get3DayWeatherWithFetch = async () => {
  let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  let url = "http://api.openweathermap.org/data/2.5/forecast";
  try {
    let res = await fetch(`${url}?lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=${apiKey}`);
    console.log("new res", res);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
    let data= await res.json();
    console.log("help", data);
    let timestamp = data.list[0].dt_txt;
    let parsedDate = Date.parse(timestamp);
    let date = new Date(parsedDate);
    let day = date.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
    let timestamp2 = data.list[8].dt_txt;
    let parsedDate2 = Date.parse(timestamp2);
    let date2 = new Date(parsedDate2);
    let day2 = date2.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
    let timestamp3 = data.list[16].dt_txt;
    let parsedDate3 = Date.parse(timestamp3);
    let date3 = new Date(parsedDate3);
    let day3 = date3.toLocaleDateString('en-us', {weekday:"short", month:"long", day:"numeric" });
    // console.log(day);

    this.setState({
      temp: Math.floor(data.list[0].main.temp),
      date: day,
      weather: data.list[0].weather[0].main,
      temp2: Math.floor(data.list[8].main.temp),
      date2: day2,
      weather2: data.list[8].weather[0].main,
      temp3: Math.floor(data.list[16].main.temp),
      date3: day3,
      weather3: data.list[16].weather[0].main,
    })
  } catch (error) {
    console.log("error", error.message);

  }
  
}


  render() {
  return (
    <div className="App">
      <h1>App</h1>
      <p>{`API KEY: ${process.env.REACT_APP_WEATHER_API_KEY}`}</p>
      {this.state.lon && this.state.lat &&
      <p>{`Lat: ${this.state.lat}, Lon: ${this.state.lon}`}</p>}
      {this.state.date && this.state.weather && this.state.temp &&
      <p>{`${this.state.date} - Weather Outlook: ${this.state.weather}, Temp: ${this.state.temp} degrees.`}</p>}
      {this.state.date2 && this.state.weather2 && this.state.temp2 &&
      <p>{`${this.state.date2} - Weather Outlook: ${this.state.weather2}, Temp: ${this.state.temp2} degrees.`}</p>}
      {this.state.date3 && this.state.weather3 && this.state.temp3 &&
      <p>{`${this.state.date3} - Weather Outlook: ${this.state.weather3}, Temp: ${this.state.temp3} degrees.`}</p>}
    </div>
  );
}
}


export default App;
