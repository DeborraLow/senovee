import React from 'react';
import PropTypes from 'prop-types';
import Line from '../components/line';

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

const ViewTemplate = ({ pageContext }) => {
  const { raw, parsed } = pageContext;
  const keys = makeUniqKey(parsed, 'body');

  return (
    <div>
      {parsed.map((o, i) => (
        <Line key={keys[i]} {...o} />
      ))}
    </div>
  );
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
