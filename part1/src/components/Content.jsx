import React from "react";

function Content(props) {
  return <div>
    <p>
        {props.part1} {props.ex1}
    </p>
    <p>
        {props.part2} {props.ex2}
    </p>
    <p>
        {props.part3} {props.ex3}
    </p>
  </div>;
}

export default Content;