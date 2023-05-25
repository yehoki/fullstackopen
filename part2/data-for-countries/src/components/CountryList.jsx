import React from "react";

export const CountryList = (props) => {
  const countries = props.countries.map((country) => country.name.common);
  console.log(countries);
  return <div>CountryList</div>;
};
