import React from 'react';
import PropTypes from 'prop-types';
import Novel from '../components/novel';

const ViewTemplate = ({ pageContext }) => {
  const { ast } = pageContext;

  return <Novel ast={ast} />;
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
