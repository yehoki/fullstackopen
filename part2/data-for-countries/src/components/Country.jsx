import React from "react";
import { WeatherData } from "./WeatherData";

export const Country = (props) => {
  const sortLanguages = props.languages.map((language) => (
    <li className="language" key={language}>
      {language}
    </li>
  ));

  const sortCapitals =
    props.capital.length === 1
      ? props.capital[0]
      : props.capital.map((capital) => <p key={capital}>{capital}</p>);

  return (
    <div>
      <h2>{props.countryName}</h2>
      <strong>Capital: </strong>
      {sortCapitals}
      <p>
        <strong>Area: </strong>
        {props.area}
      </p>
      <p>
        <strong>Population: </strong>
        {props.population}
      </p>
      <h4>Languages</h4>
      <ul>{sortLanguages}</ul>
      <div>
        <img className="flag" src={props.flagLink} alt={props.flagAlt} />
      </div>
      <WeatherData capital={props.capital} />
    </div>
  );
};
