import React from 'react';
import PropTypes from 'prop-types';

const ViewTemplate = ({ pageContext }) => {
  const { raw } = pageContext;
  return <pre>{raw}</pre>;
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
