import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ListGroup from './list-group';
import { makeTree } from '../util/util';
import styles from './list.module.css';

const query = graphql`
  {
    allFile(
      sort: { order: ASC, fields: [relativePath] }
      filter: { ext: { eq: ".txt" } }
    ) {
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
    file(relativePath: { eq: "_config.json" }) {
      childTextJson {
        title
      }
    }
  }
`;

const List = () => {
  const data = useStaticQuery(query);
  const root = makeTree(data.allFile.edges);

  return (
    <ol className={styles.list}>
      <ListGroup
        title={data.file.childTextJson.title}
        slug={root.fields.slug}
        childNodes={Object.values(root.children)}
        level={root.level}
      />
    </ol>
  );
};
export default List;
