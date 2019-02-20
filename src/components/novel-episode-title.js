import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './novel.module.css';

const NovelEpisodeTitle = ({ children, styleName }) => {
  const className = classNames({
    [styles.episodeTitle]: true,
    [styles[styleName]]: true,
  });
  return <h4 className={className}>{children}</h4>;
};
NovelEpisodeTitle.propTypes = {
  children: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelEpisodeTitle;
