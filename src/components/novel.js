import React from 'react';
import PropTypes from 'prop-types';
import Line from './line';
import styles from './novel.module.css';

const makeUniqKey = (array, propName, useLength = 5) => {
  const cache = {};
  const keys = [];
  for (let i = 0; i < array.length; i += 1) {
    const key = array[i][propName].slice(0, useLength);
    if (!cache[key]) {
      cache[key] = 0;
    }
    keys.push(`${key}_${cache[key]}`);
    cache[key] += 1;
  }

  return keys;
};

const Novel = ({ ast, styleName }) => {
  const keys = makeUniqKey(ast, 'body');
  return (
    <div>
      <div className={styles[styleName]}>
        {ast.map((o, i) => (
          <Line key={keys[i]} {...o} />
        ))}
      </div>
    </div>
  );
};
Novel.propTypes = {
  ast: PropTypes.arrayOf(PropTypes.object).isRequired,
  styleName: PropTypes.string,
};
Novel.defaultProps = {
  styleName: 'kakuyomu',
};

export default Novel;
