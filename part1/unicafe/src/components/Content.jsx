import React from "react";
import { Score } from "./Score";

export const Content = (props) => {
  return (
    <div>
      <Score text="Good" score={props.good} />
      <Score text="Neutral" score={props.neutral} />
      <Score text="Bad" score={props.bad} />
    </div>
  );
};
