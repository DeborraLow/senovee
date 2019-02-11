import React from 'react';
import PropTypes from 'prop-types';

const ViewTemplate = ({ pageContext }) => {
  const { raw, parsed, compiled } = pageContext;
  return <pre>{compiled}</pre>;
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
