import React from 'react';

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
