import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const IndexPage = ({ data }) => {
  const viewLinks = data.allFile.edges.map(({ node }) => {
    const slug = node.relativePath
      .replace(/\//g, '_')
      .slice(0, -node.ext.length);
    return (
      <Link key={node.relativePath} to={`/view/${slug}`}>
        <li>{slug}</li>
      </Link>
    );
  });
  return (
    <>
      <h1>senovee</h1>
      <ul>{viewLinks}</ul>
    </>
  );
};
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};
export default IndexPage;

export const query = graphql`
  {
    allFile {
      edges {
        node {
          ext
          relativePath
        }
      }
    }
  }
`;
