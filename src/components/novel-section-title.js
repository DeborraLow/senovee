import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConfigContext } from './layout';
import styles from './novel.module.css';

const NovelSectionTitle = ({ children, level }) => {
  return (
    <ConfigContext.Consumer>
      {({ theme }) => (
        <h3
          className={classNames(
            styles.sectionTitle,
            styles[`lv${level}`],
            styles[theme]
          )}
        >
          <span>{children}</span>
        </h3>
      )}
    </ConfigContext.Consumer>
  );
};
NovelSectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default NovelSectionTitle;
