import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConfigContext } from './layout';
import styles from './config.module.css';

const ThemeChangeButton = ({ themeName }) => (
  <ConfigContext.Consumer>
    {({ theme, setTheme }) => (
      <button
        type="button"
        className={classNames({
          [styles.themeChangeButton]: true,
          [styles.active]: theme === themeName,
        })}
        onClick={() => setTheme(themeName)}
      >
        {themeName}
      </button>
    )}
  </ConfigContext.Consumer>
);
ThemeChangeButton.propTypes = {
  themeName: PropTypes.string.isRequired,
};

const Config = () => {
  return (
    <div className={styles.config}>
      <ThemeChangeButton themeName="kakuyomu" />
      <ThemeChangeButton themeName="narou" />
    </div>
  );
};

export default Config;
