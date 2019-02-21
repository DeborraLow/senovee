import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import NovelSection from './novel-section';
import NovelEpisode from './novel-episode';
import { ConfigContext } from './layout';
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

const Novel = ({ root, nodes }) => {
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

  return (
    <ConfigContext.Consumer>
      {({ theme }) => (
        <div className={styles.novel}>
          <div className={classNames(styles.novelContent, styles[theme])}>
            {tree.isDir ? (
              <NovelSection
                childNodes={Object.values(tree.children)}
                title={tree.fields.title}
                level={tree.level}
              />
            ) : (
              <NovelEpisode src={tree.fields.body} title={tree.fields.title} />
            )}
          </div>
        </div>
      )}
    </ConfigContext.Consumer>
  );
};
Novel.propTypes = {
  root: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({ node: PropTypes.object }))
    .isRequired,
};

export default Novel;
