import React from "react";

export const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
      <div>Has {props.votes} votes</div>
    </div>
  );
};
