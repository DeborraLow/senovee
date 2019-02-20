import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import List from '../components/list';
import Novel from '../components/novel';

const ViewTemplate = ({ data }) => {
  const nodes = data.allFile.edges.map(({ node }) => node);

  return (
    <Layout>
      <List />
      <Novel src={nodes[0].fields.body} title={nodes[0].fields.title} />
    </Layout>
  );
};

ViewTemplate.propTypes = {
  data: PropTypes.object.isRequired,
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
