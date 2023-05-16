import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";
export const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};
