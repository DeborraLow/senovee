import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import senoveeAst from 'senovee-ast';

import Ruby from './ruby';
import Mark from './mark';
import styles from './line.module.css';

const astTypes = {
  body: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  symbol: PropTypes.string,
};

const astToComponent = (ast) =>
  ast.map((node) => {
    let s;
    if (typeof node === 'string') {
      s = node;
    }
    if (node.tag === 'br') {
      s = <br />;
    }
    if (node.tag === 'ruby') {
      s = <Ruby ruby={node.ruby}>{node.target}</Ruby>;
    }
    if (node.tag === 'mark') {
      s = <Mark>{node.target}</Mark>;
    }
    return s;
  });

const Line = React.memo(({ body, type, symbol }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 200);
  }, [type, body, symbol]);

  const lineAst = senoveeAst.buildLine({ body, type, symbol });
  const components = astToComponent(lineAst);

  const className = classNames({
    [styles.line]: true,
    [styles.active]: active,
    [styles[type]]: true,
    [styles[symbol]]: symbol in styles,
  });

  return <p className={className}>{components}</p>;
});

Line.propTypes = astTypes;
Line.defaultProps = { symbol: null };
export default Line;
