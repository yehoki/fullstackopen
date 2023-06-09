import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

export const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="search-filter">Filter</label>
      <input id="search-filter" type="text" onChange={handleFilterChange} />
    </div>
  );
};
