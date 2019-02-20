import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './list.module.css';

const ListGroup = ({ node }) => {
  const className = classNames({
    [styles.listItem]: true,
    [styles[`lv${node.level}`]]: true,
  });

  return (
    <Link className={className} to={`/view/${node.fields.slug}`}>
      <li>{node.fields.title}</li>
    </Link>
  );
};
ListGroup.propTypes = {
  node: PropTypes.object.isRequired,
};

export default ListGroup;
