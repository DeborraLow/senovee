import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import List from '../components/list';
import Novel from '../components/novel';

const ViewTemplate = ({ pageContext }) => {
  const { ast } = pageContext;

  return (
    <Layout>
      <List />
      <Novel ast={ast} />
    </Layout>
  );
};

ViewTemplate.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default ViewTemplate;
