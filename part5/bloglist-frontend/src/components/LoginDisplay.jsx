import React from 'react';

export const LoginDisplay = (props) => {
  return (
    <>
      <div>
        <h2>Blogs</h2>
        {props.name} logged in <button id="logout-button" onClick={props.onClick}>Logout</button>
      </div>
    </>
  );
};
