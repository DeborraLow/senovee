import React from 'react';
import PropTypes from 'prop-types';
import NovelEpisodeBody from './novel-episode-body';
import NovelEpisodeTitle from './novel-episode-title';

const NovelEpisode = ({ src, title, styleName }) => {
  return (
    <>
      <NovelEpisodeTitle styleName={styleName}>{title}</NovelEpisodeTitle>
      <NovelEpisodeBody src={src} styleName={styleName} />
    </>
  );
};
NovelEpisode.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NovelEpisode;
