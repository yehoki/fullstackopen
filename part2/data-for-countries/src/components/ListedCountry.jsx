import React from "react";

export const ListedCountry = (props) => {
  return (
    <div>
      {props.countryName} <button onClick={props.onClick}>Show</button>
    </div>
  );
};
