import React from 'react';
import PropTypes from 'prop-types';
import Line from './line';

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

const Novel = ({ ast }) => {
  const keys = makeUniqKey(ast, 'body');
  return (
    <div>
      {ast.map((o, i) => (
        <Line key={keys[i]} {...o} />
      ))}
    </div>
  );
};
Novel.propTypes = {
  ast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Novel;
