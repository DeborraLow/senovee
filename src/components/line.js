import React from 'react';
import PropTypes from 'prop-types';
import senoveeAst from 'senovee-ast';

import styles from './line.module.css';

const astTypes = {
  body: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string,
};

const Line = ({ body, type, symbol }) => {
  const builtBody = senoveeAst.buildLine({ body, type, symbol });
  return (
    <p className={`${styles.line} ${styles[type]} ${styles[symbol] || ''}`}>
      {type === 'br' ? <br /> : builtBody}
    </p>
  );
};

Line.propTypes = astTypes;
Line.defaultProps = { symbol: null };
export default Line;
