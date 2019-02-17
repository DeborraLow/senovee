import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import senoveeAst from 'senovee-ast';

import Ruby from './ruby';
import Mark from './mark';
import styles from './line.module.css';

const astTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
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
      s = (
        <Ruby styles={styles} ruby={node.ruby}>
          {node.target}
        </Ruby>
      );
    }
    if (node.tag === 'mark') {
      s = <Mark styles={styles}>{node.target}</Mark>;
    }
    return s;
  });

const Line = React.memo(({ body, type, symbol, styleName }) => {
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
    [styles[styleName]]: true,
    [styles.line]: true,
    [styles.active]: active,
    [styles[`type_${type}`]]: true,
    [styles[`symbol_${symbol}`]]: symbol in styles,
  });

  return <div className={className}>{components}</div>;
});

Line.propTypes = {
  ...astTypes,
  styleName: PropTypes.string.isRequired,
};
export default Line;
