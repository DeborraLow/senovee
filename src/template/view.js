import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import List from '../components/list';
import Novel from '../components/novel';

const ViewTemplate = ({ data, pageContext }) => {
  const nodes = data.allFile.edges;

  return (
    <Layout>
      <List />
      <Novel root={pageContext.slug} nodes={nodes} />
    </Layout>
  );
};

ViewTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query($regex: String!) {
    allFile(
      filter: { relativePath: { regex: $regex } }
      sort: { order: ASC, fields: [relativePath] }
    ) {
      edges {
        node {
          name
          relativePath
          relativeDirectory
          fields {
            slug
            title
            body
          }
        }
      }
    }
  }
`;

export default ViewTemplate;
