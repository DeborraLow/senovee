import React from 'react';
import PropTypes from 'prop-types';

const Ruby = ({ ruby, children, styles }) => {
  const child = typeof children === 'string' ? children : children[0];
  return (
    <ruby className={styles.ruby} data-ruby={ruby}>
      <span className={styles.hidden}>｜</span>
      {child}
      <rt>{ruby}</rt>
      <span className={styles.hidden}>《{ruby}》</span>
    </ruby>
  );
};
Ruby.propTypes = {
  ruby: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

export default Ruby;
