import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import senoveeAst from 'senovee-ast';

import styles from './line.module.css';

const astTypes = {
  body: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string,
};

const Line = React.memo(({ body, type, symbol }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 200);
  }, [type, body, symbol]);

  const builtBody = senoveeAst.buildLine({ body, type, symbol });
  const className = classNames({
    [styles.line]: true,
    [styles.active]: active,
    [styles[type]]: true,
    [styles[symbol]]: symbol in styles,
  });

  return <p className={className}>{type === 'br' ? <br /> : builtBody}</p>;
});

Line.propTypes = astTypes;
Line.defaultProps = { symbol: null };
export default Line;
