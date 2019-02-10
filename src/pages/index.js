import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

const IndexPage = ({ data }) => {
  console.log(data);
  return <h1>senovee</h1>;
};
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};
export default IndexPage;

export const query = graphql`
  {

  }
`;
