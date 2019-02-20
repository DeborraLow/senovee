import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ListItem from './list-item';
import styles from './list.module.css';

const ListGroup = ({ node }) => {
  const childNodes = Object.values(node.children).map((obj) =>
    obj.isDir ? (
      <ListGroup key={obj.relativePath} node={obj} />
    ) : (
      <ListItem key={obj.relativePath} node={obj} />
    )
  );
  const className = classNames({
    [styles.listGroup]: true,
    [styles[`lv${node.level}`]]: true,
  });

  return (
    <>
      <Link className={className} to={`/view/${node.fields.slug}`}>
        <li>{node.fields.title}</li>
      </Link>
      {childNodes}
    </>
  );
};
ListGroup.propTypes = {
  node: PropTypes.shape({
    isDir: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
  }).isRequired,
};

export default ListGroup;
