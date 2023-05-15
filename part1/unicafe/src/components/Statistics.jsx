import React from "react";
import { StatisticLine } from "./StatisticLine";

export const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = total === 0 ? 0 : (props.good - props.bad) / total;
  const positive = total === 0 ? 0 : `${(props.good / total) * 100} %`;
  const display =
    total === 0 ? (
      <>No feedback given</>
    ) : (
      <table>
        <tbody>
          <StatisticLine text="Good" score={props.good} />
          <StatisticLine text="Neutral" score={props.neutral} />
          <StatisticLine text="Bad" score={props.bad} />
          <StatisticLine text="All" score={total} />
          <StatisticLine text="Average" score={average} />
          <StatisticLine text="Positive" score={positive} />
        </tbody>
      </table>
    );

  return <div>{display}</div>;
};
