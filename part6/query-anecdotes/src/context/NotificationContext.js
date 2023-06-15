import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload;
    case 'REMOVE':
      return '';
    default:
      return '';
  }
};

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context[0];
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  return context[1];
};

export async function makeNotification(setNotification, text) {
  setNotification({ type: 'NOTIFY', payload: text });
  await setTimeout(() => {
    setNotification({ type: 'REMOVE' });
  }, 5000);
}

// export async function makeErrorNotification(setNotification, text) {
// setNotification({type})
// }

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
