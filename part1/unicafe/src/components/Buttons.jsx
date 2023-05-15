import React from "react";
import { Button } from "./Button";

export const Buttons = (props) => {
  return (
    <div>
      <Button text="Good" onClick={props.setGood} />
      <Button text="Neutral" onClick={props.setNeutral} />
      <Button text="Bad" onClick={props.setBad} />
    </div>
  );
};
