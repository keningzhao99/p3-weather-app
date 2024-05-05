import { useState } from 'react'
import Weather from './Weather';
import News from './News';

function Location() {
  const [query, setQuery] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searched, setSearched] = useState(false);
  //const [trigger, setTrigger] = useState(false);

  const API_KEY = '2db1244558913b2570f9e684a8e3369f'

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
      }
      setSearched(true);
      //setTrigger(prevTrigger => !prevTrigger);

    } 
      catch (error) {
        console.error('Error fetching data:', error);
        setLatitude(null);
        setLongitude(null);
      }
    };

  return (
    <>
      <div>
        <h1> Weather Lookup App </h1>
        <input
          type="text"
          placeholder="Enter city name, state code (only for the US) and country code divided by comma."
          value={query}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
        {searched && latitude && longitude ? (
          <div>
            <h2>Latitude: {latitude}</h2>
            <h2>Longitude: {longitude}</h2>
            <Weather lat={latitude} lon={longitude} />
          </div>
        ) : searched ? (
          <p>Location not found</p>
        ) : null}
        <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        <News />
      </div>
    </>
  )
}

export default Location
