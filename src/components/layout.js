/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Config from './config';
import styles from './layout.module.css';

export const ConfigContext = React.createContext({
  theme: '',
  setTheme: () => {},
});

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'kakuyomu',
      setTheme: this.setTheme.bind(this),
    };
  }

  setTheme(theme) {
    this.setState({
      theme,
    });
  }

  render() {
    const { children } = this.props;
    const className = classNames({
      [styles.layout]: true,
      [styles.reverse]: false,
    });
    return (
      <ConfigContext.Provider value={this.state}>
        <Config />
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
