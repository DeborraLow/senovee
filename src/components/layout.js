import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const className = classNames({
    [styles.layout]: true,
    [styles.reverse]: false,
  });
  return <div className={className}>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
