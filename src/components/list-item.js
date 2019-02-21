import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './list.module.css';

const ListGroup = ({ title, slug, level }) => {
  const className = classNames({
    [styles.listItem]: true,
    [styles[`lv${level}`]]: true,
  });

  return (
    <Link className={className} to={`/view/${slug}`}>
      <li>{title}</li>
    </Link>
  );
};
ListGroup.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default ListGroup;
