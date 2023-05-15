import React from "react";

const Total = (props) => {
  const total = props.parts.reduce((totalled, add) => {
    return totalled + add.exercises;
  }, 0);
  return (
    <div>
      <h3>Number of exercises {total}</h3>
    </div>
  );
};

export default Total;
