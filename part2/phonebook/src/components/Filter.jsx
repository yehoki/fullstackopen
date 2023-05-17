import React from "react";

export const Filter = (props) => {
  return (
    <div>
      Filter shown with{" "}
      <input value={props.searchVal} onChange={props.searchChange} />{" "}
    </div>
  );
};
