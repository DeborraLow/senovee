import React from 'react';
import PropTypes from 'prop-types';
import Novel from '../components/novel';

const ViewTemplate = ({ pageContext }) => {
  const { parsed } = pageContext;

  return <Novel ast={parsed} />;
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
