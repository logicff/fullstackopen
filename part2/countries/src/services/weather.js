import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org'
// 可以进一步防止API KEY暴露在客户端，比如创建后端代理服务器
const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
const units = "metric"  // 使用单位摄氏度

const getCityWeather = (city) => {
    if (!api_key) {
        return Promise.reject(new Error('OpenWeather API key is not set. Please configure VITE_OPENWEATHER_API_KEY environment variable.'))
    }
    const request = axios.get(`${baseUrl}/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`)
    return request.then(response => {
        const data = response.data
        // 常用的数据，当然可以全部返回，不过这样方便一点
        return {
            temperature: data.main.temp,
            condition: data.weather[0].description,
            windSpeed: data.wind.speed,
            windDirection: data.wind.deg,
            humidity: data.main.humidity,
            icon: data.weather[0].icon
        }
    })
}

export default { 
  getCityWeather: getCityWeather
}
