import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const ListRender = (data) => (
  <ul>
    {data.allFile.edges.map(({ node }) => (
      <Link key={node.relativePath} to={`/view/${node.fields.slug}`}>
        <li>{node.fields.slug}</li>
      </Link>
    ))}
  </ul>
);

const List = () => (
  <StaticQuery
    render={ListRender}
    query={graphql`
      query FileCollection {
        allFile(sort: { order: ASC, fields: [relativePath] }) {
          edges {
            node {
              relativeDirectory
              fields {
                slug
              }
            }
          }
        }
      }
    `}
  />
);

export default List;
