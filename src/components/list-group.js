import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ListItem from './list-item';
import styles from './list.module.css';

const ListGroup = ({ node, level }) => {
  const childNodes = Object.values(node.children).map((obj) =>
    obj.isDir ? (
      <ListGroup key={obj.relativePath} node={obj} level={level + 1} />
    ) : (
      <ListItem key={obj.relativePath} node={obj} level={level + 1} />
    )
  );
  const className = classNames({
    [styles.listGroup]: true,
    [styles[`lv${level}`]]: true,
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
  level: PropTypes.number.isRequired,
};

export default ListGroup;
