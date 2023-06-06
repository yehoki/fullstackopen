import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? 'none' : '',
  };
  const showWhenVisible = {
    display: visible ? '' : 'none',
  };

  const definedClose = props.cancel ? props.cancel : 'Cancel';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{definedClose}</button>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
