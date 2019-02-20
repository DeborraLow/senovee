import React from 'react';
import PropTypes from 'prop-types';
import Line from './line';
import styles from './novel.module.css';

const makeUniqKey = (array, useLength = 5) => {
  const cache = {};
  const keys = [];
  for (let i = 0; i < array.length; i += 1) {
    const key = array[i].slice(0, useLength);
    if (!cache[key]) {
      cache[key] = 0;
    }
    keys.push(`${key}_${cache[key]}`);
    cache[key] += 1;
  }

  return keys;
};

const Novel = ({ src, styleName }) => {
  const srcLines = src.split('\n');
  const keys = makeUniqKey(srcLines);

  return (
    <div className={styles.novel}>
      <div className={styles[styleName]}>
        {srcLines.map((srcLine, i) => (
          <Line styleName={styleName} key={keys[i]} src={srcLine} />
        ))}
      </div>
    </div>
  );
};
Novel.propTypes = {
  src: PropTypes.string.isRequired,
  styleName: PropTypes.string,
};
Novel.defaultProps = {
  styleName: 'kakuyomu',
};

export default Novel;
