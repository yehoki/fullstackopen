import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearUser } from '../reducers/UserReducer';

export const LoginDisplay = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
  };
  return (
    <>
      <div
        style={{
          border: '1px solid black',
          width: 'fit-content',
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: 'lightgrey'
        }}
      >
        {user.name} logged in{' '}
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};
