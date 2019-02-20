import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ListGroup from './list-group';
import { makeTree } from '../util/util';
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

const List = () => {
  const data = useStaticQuery(query);
  const root = makeTree(data.allFile.edges);
  return (
    <ol className={styles.list}>
      <ListGroup node={root} level={root.level} />
    </ol>
  );
};
export default List;
