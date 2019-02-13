import React from 'react';
import PropTypes from 'prop-types';
import styles from './mark.module.css';

const Mark = ({ children }) => {
  const child = typeof children === 'string' ? children : children[0];

  return (
    <em className={styles.mark}>
      <span className={styles.hidden}>《《</span>
      {child.split('').map((char, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i}>{char}</span>
      ))}
      <span className={styles.hidden}>》》</span>
    </em>
  );
};
Mark.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Mark;
