import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import List from '../components/list';

const IndexPage = ({ data }) => <List nodes={data.allFile.edges} />;

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
