import React from "react";
import Part from "./Part";

const Content = (props) => {
    console.log(props);
    console.log(props[0]);
  const parts = props.parts.map((variable) => {
    return <Part
    part = {variable.name}
    ex = {variable.exercises}
    key = {variable.name} />
  });
  return <div>{parts}</div>;
};
export default Content;
