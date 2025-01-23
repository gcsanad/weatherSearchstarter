import React, { useEffect, useState } from 'react'

export type Weather = {
    id: number,
    cityName: string,
    temperature: number,
    weather: string,
    icon: string
}

const WeatherApp: React.FC = () => {

    const [weatherData, setWeatherData] = useState<Weather[]>(); 
    const [city, setCity] = useState<string>(''); 
    const [filteredWeather, setFilteredWeather] = useState<Weather | null>(null); 
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetch('./Weather.json')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Fetched weather data:', data.weather);
            setWeatherData(data.weather);
          })
          .catch((err) => {
            console.error('Error loading weather data:', err);
          });
      }, []);
    
    
    const handleSearch = () => {
        if (Array.isArray(weatherData)) {
            const cityData = weatherData.find(
              (data) => data.cityName.toLowerCase() === city.toLowerCase()
            );
            if (cityData) {
              setFilteredWeather(cityData);
              setError('');
            } else {
              setFilteredWeather(null);
              setError('No weather data found for the given city.');
            }
          } else {
            console.error('weatherData is not an array:', weatherData);
          }
  };

  return (
    <div className="WeatherApp">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {filteredWeather ? (
        <div className="weather-info">
          <h2>{filteredWeather.cityName}</h2>
          <p>{filteredWeather.temperature}°C</p>
          <div className='icon'>
            <img
                src={filteredWeather.icon}
                alt={filteredWeather.weather}
                className="weather-icon"
            />
          </div>
          <p>{filteredWeather.weather}</p>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p>Enter a city to search for weather data.</p>
      )}
    </div>
  );
  

}

export default WeatherApp