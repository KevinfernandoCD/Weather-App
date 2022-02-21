//COMPONENTS IMPORT
import Weather from './components/weather';
import './App.css';
//EXTERNAL MODULES IMPORT
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

const API_KEY = '4f26c6587d5d388c43bd2e584a6ce5ba';

class App extends Component {
  constructor(){
    super();
    this.state = {
      city:"",
      country:"",
      icon:"",
      main:"",
      celcius:"",
      max_temp:"",
      min_temp:"",
      desc:"",
      error:""
    };
    
    this.weathericons = {
      thuderstorm:"fa-solid fa-poo-storm fa-2x",
      drizzle:"fa-solid fa-cloud-moon-rain fa-2x",
      snow:"fa-solid fa-snowflake fa-2x",
      rain:"fa-solid fa-cloud-rain fa-2x",
      cloudy:"fa-solid fa-cloud fa-2x",
      clear:"fa-solid fa-cloud-sun fa-2x",
      atmosphere:"fa-solid fa-smog fa-2x"
    }

    
  
  }

  getWeatherIcon = (id) => {

    let weatherIcon = ""

    if(id === 800 ){

      weatherIcon = this.weathericons.clear


    }
    if((800 < id)&&(id < 900)){

      weatherIcon = this.weathericons.cloudy

    }

    if((700 < id)&&(id < 800)){

      weatherIcon = this.weathericons.atmosphere

    }

    if((600 <= id)&&(id < 700)){

      weatherIcon = this.weathericons.snow

    }

    if((500 <= id)&&(id < 600)){

      weatherIcon = this.weathericons.rain

    }

    if((300 <= id)&&(id < 400)){

      weatherIcon = this.weathericons.drizzle

    }

    if((200 <= id)&&(id < 300)){

      weatherIcon = this.weathericons.atmosphere

    }

    return weatherIcon;

  }

  
//GETTING THE WEATHER USING THE API
  getWeather = async (city) => {

    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

      const response = await api_call.json()

      console.log(response)
  
  
  
  //CONVERTING KELVIN INTO CELECIUS
  
     const celcius =  response.main.temp - 273.1;
     const max_temp_celcius = response.main.temp_max - 273.1;
     const min_temp_celcius = response.main.temp_min - 273.1;
     const main_temp =  Math.round(celcius).toFixed(2);
     const main_max_temp = Math.round(max_temp_celcius).toFixed(2);
     const main_min_temp = Math.round(min_temp_celcius).toFixed(2);
  
     
    this.setState({error:"",city:response.name,country:response.sys.country,celcius:main_temp,max_temp:main_max_temp,min_temp:main_min_temp,desc:response.weather[0].description,icon:this.getWeatherIcon(response.weather[0].id)})
      
    } catch (error) {

      const errorText = "Invalid City Name, Please Check the city name again!";

      this.setState({error:errorText,city:""});   
    }
}

valueHandler = (e) => {

  this.state.city = e.currentTarget.value;

  



}

handlerSubmit = (e) =>{

  e.preventDefault();
  this.getWeather(this.state.city);


}

render() { 
    return (
      <div className="App">

      <label htmlFor='city' className='city-label'>Enter a City Name :</label>
      <input className='city' style={{width:'500px'}} onChange={this.valueHandler} type='text' name='city'></input>
      <input className='btn btn-primary' type="submit" value='Find Weather' onClick={this.handlerSubmit} ></input>
      {this.state.error && <div className='alert alert-danger'>{this.state.error}</div>}

      <Weather icon={this.state.icon} celcius={this.state.celcius} max_temp={this.state.max_temp} min_temp={this.state.min_temp} city={this.state.city} country={this.state.country} desc={this.state.desc}/>
     
       </div>

    );
  }
}
 
export default App;
