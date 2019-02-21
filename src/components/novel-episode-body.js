import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Line from './line';
import { ConfigContext } from './layout';
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

const NovelEpisodeBody = ({ src }) => {
  const srcLines = src.split('\n');
  const keys = makeUniqKey(srcLines);

  return (
    <ConfigContext.Consumer>
      {({ theme }) => (
        <div className={classNames(styles.episodeBody, styles[theme])}>
          {srcLines.map((srcLine, i) => (
            <Line key={keys[i]} src={srcLine} />
          ))}
        </div>
      )}
    </ConfigContext.Consumer>
  );
};
NovelEpisodeBody.propTypes = {
  src: PropTypes.string.isRequired,
};

export default NovelEpisodeBody;
