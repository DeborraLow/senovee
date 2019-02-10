import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const IndexPage = ({ data }) => {
  const viewLinks = data.allFile.edges.map(({ node }) => (
    <Link key={node.relativePath} to={`/view/${node.fields.slug}`}>
      <li>{node.fields.slug}</li>
    </Link>
  ));
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
          fields {
            slug
          }
        }
      }
    }
  }
`;
