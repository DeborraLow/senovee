import React from 'react';
import PropTypes from 'prop-types';
import styles from './ruby.module.css';

const Ruby = ({ ruby, children }) => {
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
};

export default Ruby;
