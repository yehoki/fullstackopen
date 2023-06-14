import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../reducers/UserReducer';
export const LoginArea = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      userLogin({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    );
  };
  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input type="text" id="username" name="username" />
        </div>
        <div>
          Password:
          <input type="password" id="password" name="password" />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </>
  );
};
