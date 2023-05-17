import React from "react";

export const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input value={props.nameValue} onChange={props.nameChange} />
      </div>
      <div>
        Number:{" "}
        <input value={props.numberValue} onChange={props.numberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
