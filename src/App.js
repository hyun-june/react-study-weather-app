import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton'

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태가 들어간다.
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭 시 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
// 7. 검색어를 입력하면 해당 도시 날씨를 보여준다.
function App() {
  const api_Key = '040347aad8eefbe8027a0cb58edd9c93'

  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState('');
  const [selectCity, setSelectCity] = useState('')
  let [loading, setLoading] = useState(false);
  const cities=['Paris','New york','Tokyo','Seoul','London','Los Angeles','Madrid','Bangkok','Barcelona','Beijing','Berlin']

  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      console.log("현재 위치",lat,lon)
      getWeatherApi(lat,lon)
      setSelectCity('city');
    }
  );
}

const getWeatherApi = async(lat,lon) =>{
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${api_Key}`
    setLoading(true);
    const response = await fetch(url)
    const data = await response.json();
    setWeather(data);
    setLoading(false);
    console.log("weatherData",data)
  } catch (error) {
    console.log("api error",error.message)
    setLoading(false)
  }
}

const getWeatherByCity = async()=>{
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&appid=${api_Key}`
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    setLoading(false);
  } catch (error) {
    console.log("city error",error.message)
    setLoading(false);
  }
}

const choicCity = (city) =>{
  setCity(city);
  setSelectCity(city)
}

  useEffect(()=>{
    if(city===""){
      getCurrentLocation();
    } else{
      getWeatherByCity();
    }
  },[city])

  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} cities={cities} setCity={choicCity} loading={loading} selectCity={selectCity}/>
        <WeatherButton getCurrentLocation={getCurrentLocation}/>
      </div>
    </div>
  );
}

export default App;
