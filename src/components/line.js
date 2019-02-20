import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import senoveeAst from 'senovee-ast';

import Ruby from './ruby';
import Mark from './mark';
import styles from './line.module.css';

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

const Line = React.memo(({ src, styleName }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 200);
  }, [src]);

  const lineAst = senoveeAst.parseLine(src);
  const convertedAst = senoveeAst.buildLine(lineAst);
  const components = astToComponent(convertedAst);

  const className = classNames({
    [styles[styleName]]: true,
    [styles.fixed]: true,
    [styles.line]: true,
    [styles.active]: active,
    [styles[`type_${lineAst.type}`]]: true,
    [styles[`symbol_${lineAst.symbol}`]]: lineAst.symbol in styles,
  });

  return <div className={className}>{components}</div>;
});

Line.propTypes = {
  src: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
};
export default Line;
