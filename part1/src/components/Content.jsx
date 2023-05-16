import React from "react";
import Part from "./Part";

const Content = (props) => {
  const parts = props.parts.map((variable) => {
    return <Part
    part = {variable.name}
    ex = {variable.exercises}
    key = {variable.id} />
  });
  return <div>{parts}</div>;
};
export default Content;
