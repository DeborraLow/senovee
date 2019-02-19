import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './list.module.css';

const ListGroup = ({ node, level }) => {
  const className = classNames({
    [styles.listItem]: true,
    [styles[`lv${level}`]]: true,
  });

  return (
    <Link className={className} to={`/view/${node.fields.slug}`}>
      <li>{node.fields.title}</li>
    </Link>
  );
};
ListGroup.propTypes = {
  node: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
};

export default ListGroup;
