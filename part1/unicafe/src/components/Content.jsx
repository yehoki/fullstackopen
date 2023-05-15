import React from "react";
import { Score } from "./Score";

export const Content = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = total === 0 ? 0 : (props.good - props.bad) / total;
  const positive = total === 0 ? 0 : `${(props.good / total) * 100} %`;
  const display =
    total === 0 ? (
      <>No feedback given</>
    ) : (
      <>
        <Score text="Good" score={props.good} />
        <Score text="Neutral" score={props.neutral} />
        <Score text="Bad" score={props.bad} />
        <Score text="All" score={total} />
        <Score text="Average" score={average} />
        <Score text="Positive" score={positive} />
      </>
    );

  return <div>{display}</div>;
};
