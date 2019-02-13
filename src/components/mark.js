import React from 'react';
import PropTypes from 'prop-types';

const Mark = ({ children }) => {
  const child = typeof children === 'string' ? children : children[0];
  return (
    <ruby>
      {child}
      <rt>{'・'.repeat(child.length)}</rt>
    </ruby>
  );
};
Mark.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Mark;
