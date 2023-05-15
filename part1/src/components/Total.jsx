import React from "react";

function Total(props) {
  return (
    <div>
      <h3>Number of exercises {props.ex1 + props.ex2 + props.ex3}</h3>
    </div>
  );
}

export default Total;
