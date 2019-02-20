import React from 'react';
import PropTypes from 'prop-types';
import NovelEpisode from './novel-episode';
import NovelSectionTitle from './novel-section-title';

const NovelItem = ({ node, styleName }) => {
  return node.isDir ? (
    <>
      <NovelSectionTitle level={node.level} styleName={styleName}>
        {node.fields.title}
      </NovelSectionTitle>
      {Object.values(node.children).map((child) => (
        <NovelItem key={child.fields.slug} node={child} styleName={styleName} />
      ))}
    </>
  ) : (
    <NovelEpisode
      src={node.fields.body}
      title={node.fields.title}
      styleName={styleName}
    />
  );
};
NovelItem.propTypes = {
  node: PropTypes.shape({ node: PropTypes.object }).isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelItem;
