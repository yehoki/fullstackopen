import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../../reducers/AllUsersReducer';
import { Link } from 'react-router-dom';
export const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  console.log(users);
  const userData = users.map((user) => {
    return { name: user.name, blogCount: user.blogs.length, id: user.id };
  });
  const tableDisplay = userData.map((user) => {
    const randomId = (100000 * Math.random()).toFixed(0);
    return (
      <tr key={randomId}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogCount}</td>
      </tr>
    );
  });
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>{tableDisplay}</tbody>
      </table>
    </>
  );
};
