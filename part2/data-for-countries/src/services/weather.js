import axios from "axios";
const baseUrl = "http://api.weatherapi.com/v1/current.json?key=" + process.env.REACT_APP_WEATHER_API;

const getCityWeather = (cityName) => {
    return axios.get(`${baseUrl}&q=${cityName}`)
}


export default getCityWeather;