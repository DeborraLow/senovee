import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './novel.module.css';

const NovelSectionTitle = ({ children, level, styleName }) => {
  const className = classNames({
    [styles.sectionTitle]: true,
    [styles[styleName]]: true,
    [styles[`lv${level}`]]: true,
  });

  return (
    <h3 className={className}>
      <span>{children}</span>
    </h3>
  );
};
NovelSectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelSectionTitle;
