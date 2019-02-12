import React from 'react';
import PropTypes from 'prop-types';

const Ruby = ({ ruby, children }) => {
  const child = typeof children === 'string' ? children : children[0];
  return (
    <ruby>
      {child}
      <rt>{ruby}</rt>
    </ruby>
  );
};
Ruby.propTypes = {
  ruby: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Ruby;
