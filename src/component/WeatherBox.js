import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ClipLoader from "react-spinners/ClipLoader";

const WeatherBox = ({ weather, cities, setCity, loading , selectCity }) => {
  console.log("weather", weather);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="enter your search"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  return (
    <div className='weather-container'>
        {loading? 
        <div className="weather-box">
            <ClipLoader color="#f88c6b" size={150}/>
        </div>:
        <div className="weather-box">
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}℃</h2>
        <div>
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt=""/>
        </div>
        <h3>{weather?.weather[0].description}</h3>
      </div>
}
      

      <div className="city-dropdown">
        <Dropdown>
          <Dropdown.Toggle  variant="success" id="dropdown-basic">   
          {selectCity? selectCity : 'city'}
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu} className='drop-menu'>
            {cities.map((item) => (
              <Dropdown.Item onClick={()=>setCity(item)}>{item}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default WeatherBox