import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NovelEpisode from './novel-episode';
import styles from './novel.module.css';

const Novel = ({ src, title, styleName }) => {
  const className = classNames({
    [styles.novelContent]: true,
    [styles[styleName]]: true,
  });
  return (
    <div className={styles.novel}>
      <div className={className}>
        <NovelEpisode src={src} title={title} styleName={styleName} />
      </div>
    </div>
  );
};
Novel.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  styleName: PropTypes.string,
};
Novel.defaultProps = {
  styleName: 'kakuyomu',
};

export default Novel;
