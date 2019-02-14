import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const List = ({ nodes }) => (
  <>
    <ul>
      {nodes.map(({ node }) => (
        <Link key={node.relativePath} to={`/view/${node.fields.slug}`}>
          <li>{node.fields.slug}</li>
        </Link>
      ))}
    </ul>
  </>
);
List.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
