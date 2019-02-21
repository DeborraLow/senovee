import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import NovelSection from './novel-section';
import NovelEpisode from './novel-episode';
import { makeTree } from '../util/util';
import styles from './novel.module.css';

const query = graphql`
  {
    file(relativePath: { eq: "_config.json" }) {
      childTextJson {
        title
      }
    }
  }
`;

const Novel = ({ root, nodes, styleName }) => {
  const data = useStaticQuery(query);
  let tree = makeTree(nodes);
  root.split('/').forEach((dir) => {
    if (dir) {
      tree = tree.children[dir];
    }
  });
  if (tree.level === 0) {
    tree.fields.title = data.file.childTextJson.title;
  }

  const className = classNames({
    [styles.novelContent]: true,
    [styles[styleName]]: true,
  });

  return (
    <div className={styles.novel}>
      <div className={className}>
        {tree.isDir ? (
          <NovelSection
            childNodes={Object.values(tree.children)}
            title={tree.fields.title}
            level={tree.level}
            styleName={styleName}
          />
        ) : (
          <NovelEpisode
            src={tree.fields.body}
            title={tree.fields.title}
            styleName={styleName}
          />
        )}
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
