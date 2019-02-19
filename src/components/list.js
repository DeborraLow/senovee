import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ListGroup from './list-group';
import styles from './list.module.css';

const query = graphql`
  {
    allFile(sort: { order: ASC, fields: [relativePath] }) {
      edges {
        node {
          name
          relativePath
          relativeDirectory
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;

const makeTree = (nodes) => {
  const root = {
    isDir: true,
    name: '',
    relativePath: '',
    relativeDirectory: '',
    fields: {
      slug: '',
      title: '',
    },
    children: {},
  };

  nodes.forEach(({ node }) => {
    const dirs = node.relativeDirectory.split('/');
    let current = root.children;

    if (node.relativeDirectory !== '') {
      dirs.forEach((dir, i) => {
        if (!current[dir]) {
          current[dir] = {
            isDir: true,
            name: dir,
            relativePath: node.relativeDirectory,
            relativeDirectory: dirs.slice(0, i).join('/'),
            fields: {
              slug: dir,
              title: dir.slice(dir.indexOf('_') + 1),
            },
            children: {},
          };
        }
        current = current[dir].children;
      });
    }
    current[node.name] = { isDir: false, ...node };
  });

  return root;
};

const List = () => {
  const data = useStaticQuery(query);
  const root = makeTree(data.allFile.edges);

  return (
    <ol className={styles.list}>
      <ListGroup node={root} level={0} />
    </ol>
  );
};
export default List;
