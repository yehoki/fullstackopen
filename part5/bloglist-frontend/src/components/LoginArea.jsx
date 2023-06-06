import React from 'react';
import PropTypes from 'prop-types';
export const LoginArea = (props) => {
  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          Username:{' '}
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginArea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

