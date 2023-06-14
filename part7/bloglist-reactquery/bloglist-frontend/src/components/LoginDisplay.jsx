import React from 'react';
import { handleLogout, useUserDispatch } from '../context/UserContext';

export const LoginDisplay = (props) => {
  const setUser = useUserDispatch();
  return (
    <>
      <div>
        <h2>Blogs</h2>
        {props.name} logged in{' '}
        <button id="logout-button" onClick={() => handleLogout(setUser)}>
          Logout
        </button>
      </div>
    </>
  );
};
