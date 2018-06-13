import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mergeStyles } from 'wix-rich-content-editor-common';
import styles from './video-viewer.scss';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { componentData, theme, ...rest } = this.props; // eslint-disable-line no-unused-vars
    return (
      <ReactPlayer
        className={classNames(this.styles.video_player)}
        url={componentData.src}
        {...rest}
      />
    );
  }
}

VideoViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default VideoViewer;
