import { createContext, useContext, useReducer } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
const userReducer = (state, action) => {
  //prettier-ignore
  switch (action.type) {
  case 'SETUSER':
    return action.payload;
  case 'GETUSER':
    return state;
  case 'REMOVEUSER':
    return null;
  default:
    return '';
  }
};

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context[0];
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  return context[1];
};

export async function handleLog(setUser, credentials) {
  const user = await loginService.login(credentials);
  setUser({
    type: 'SETUSER',
    payload: user,
  });
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
  blogService.setToken(user.token);
}

export async function initializeUser(setUser) {
  const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser');
  if (loggedInUserJSON) {
    const user = JSON.parse(loggedInUserJSON);
    setUser({ type: 'SETUSER', payload: user });
    blogService.setToken(user.token);
  }
}

export async function handleLogout(setUser) {
  setUser({ type: 'REMOVEUSER' });
  window.localStorage.removeItem('loggedBlogAppUser');
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
