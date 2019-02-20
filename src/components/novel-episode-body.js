import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const NovelEpisodeBody = ({ src, styleName }) => {
  const srcLines = src.split('\n');
  const keys = makeUniqKey(srcLines);
  const className = classNames({
    [styles.episodeBody]: true,
    [styles[styleName]]: true,
  });

  return (
    <div className={className}>
      {srcLines.map((srcLine, i) => (
        <Line styleName={styleName} key={keys[i]} src={srcLine} />
      ))}
    </div>
  );
};
NovelEpisodeBody.propTypes = {
  src: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelEpisodeBody;
