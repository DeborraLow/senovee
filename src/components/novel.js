import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NovelItem from './novel-item';
import { makeTree } from '../util/util';
import styles from './novel.module.css';

const Novel = ({ root, nodes, styleName }) => {
  let tree = makeTree(nodes);
  root.split('/').forEach((dir) => {
    if (dir) {
      tree = tree.children[dir];
    }
  });

  const className = classNames({
    [styles.novelContent]: true,
    [styles[styleName]]: true,
  });

  return (
    <div className={styles.novel}>
      <div className={className}>
        <NovelItem node={tree} styleName={styleName} />
      </div>
    </div>
  );
};
Novel.propTypes = {
  root: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({ node: PropTypes.object }))
    .isRequired,
  styleName: PropTypes.string,
};
Novel.defaultProps = {
  styleName: 'kakuyomu',
};

export default Novel;
