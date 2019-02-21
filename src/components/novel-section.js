import React from 'react';
import PropTypes from 'prop-types';
import NovelEpisode from './novel-episode';
import NovelSectionTitle from './novel-section-title';

const NovelSection = ({ childNodes, title, level, styleName }) => {
  return (
    <>
      <NovelSectionTitle level={level} styleName={styleName}>
        {title}
      </NovelSectionTitle>
      {childNodes.map((child) =>
        child.isDir ? (
          <NovelSection
            key={child.fields.slug}
            childNodes={Object.values(child.children)}
            title={child.fields.title}
            level={child.level}
            styleName={styleName}
          />
        ) : (
          <NovelEpisode
            key={child.fields.slug}
            src={child.fields.body}
            title={child.fields.title}
            styleName={styleName}
          />
        )
      )}
    </>
  );
};
NovelSection.propTypes = {
  childNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelSection;
