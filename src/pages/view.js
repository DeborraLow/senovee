import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import List from '../components/list';
import Novel from '../components/novel';

const ViewTemplate = ({ pageContext }) => {
  const { src } = pageContext;

  return (
    <Layout>
      <List />
      <Novel src={src} />
    </Layout>
  );
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
