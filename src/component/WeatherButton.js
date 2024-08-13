import React from 'react'
import { Button } from 'react-bootstrap';


const WeatherButton = ({getCurrentLocation}) => {
  return (
    <div>
        <Button onClick={getCurrentLocation} id='location'>현재 위치</Button>
    </div>
  );
};

export default WeatherButton