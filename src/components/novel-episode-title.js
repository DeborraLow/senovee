import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConfigContext } from './layout';
import styles from './novel.module.css';

const NovelEpisodeTitle = ({ children }) => {
  return (
    <ConfigContext.Consumer>
      {({ theme }) => (
        <h4 className={classNames(styles.episodeTitle, styles[theme])}>
          {children}
        </h4>
      )}
    </ConfigContext.Consumer>
  );
};
NovelEpisodeTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NovelEpisodeTitle;
