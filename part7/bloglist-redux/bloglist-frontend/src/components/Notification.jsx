import React from 'react';
import { useSelector } from 'react-redux';

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return <div className={notification[1]}>{notification[0]}</div>;
};
