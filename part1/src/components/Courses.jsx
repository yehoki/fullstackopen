import React from "react";
import { Course } from "./Course";

export const Courses = (props) => {
  const courses = props.courses.map((variable) => {
    return <Course course={variable} key = {variable.id}/>;
  });
  return <div>{courses}</div>;
};
