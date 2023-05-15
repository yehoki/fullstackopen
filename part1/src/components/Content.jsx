import React from "react";
import Part from "./Part";

function Content(props) {
  return (
    <div>
      <Part part={props.part1} ex={props.ex1} />
      <Part part={props.part2} ex={props.ex2} />
      <Part part={props.part3} ex={props.ex3} />
    </div>
  );
}

export default Content;
