/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './layout.module.css';

export const ConfigContext = React.createContext();

class Layout extends React.Component {
  state = {
    theme: 'narou',
  };

  render() {
    const { children } = this.props;
    const className = classNames({
      [styles.layout]: true,
      [styles.reverse]: false,
    });
    return (
      <ConfigContext.Provider value={this.state}>
        <div className={className}>{children}</div>
      </ConfigContext.Provider>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
