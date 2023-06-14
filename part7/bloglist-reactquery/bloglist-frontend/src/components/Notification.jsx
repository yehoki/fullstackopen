import React from 'react';
import { useNotification } from '../context/NotificationContext';

export const Notification = () => {
  const notification = useNotification();
  return <div>{notification}</div>;
};
