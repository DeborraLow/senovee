import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ListItem from './list-item';
import styles from './list.module.css';

const ListGroup = ({ childNodes, title, slug, level }) => {
  const childComponents = childNodes.map((child) =>
    child.isDir ? (
      <ListGroup
        key={child.relativePath}
        childNodes={Object.values(child.children)}
        title={child.fields.title}
        slug={child.fields.slug}
        level={child.level}
      />
    ) : (
      <ListItem
        key={child.relativePath}
        title={child.fields.title}
        slug={child.fields.slug}
        level={child.level}
      />
    )
  );
  const className = classNames({
    [styles.listGroup]: true,
    [styles[`lv${level}`]]: true,
  });

  return (
    <>
      <Link className={className} to={`/view/${slug}`}>
        <li>{title}</li>
      </Link>
      {childComponents}
    </>
  );
};
ListGroup.propTypes = {
  childNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default ListGroup;
