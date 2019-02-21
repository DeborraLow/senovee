import React from 'react';
import PropTypes from 'prop-types';
import NovelEpisodeBody from './novel-episode-body';
import NovelEpisodeTitle from './novel-episode-title';

const NovelEpisode = ({ src, title }) => {
  return (
    <>
      <NovelEpisodeTitle>{title}</NovelEpisodeTitle>
      <NovelEpisodeBody src={src} />
    </>
  );
};
NovelEpisode.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NovelEpisode;
