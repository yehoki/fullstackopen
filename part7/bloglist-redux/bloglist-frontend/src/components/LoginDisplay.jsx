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
      <div>
        <h2>Blogs</h2>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};
