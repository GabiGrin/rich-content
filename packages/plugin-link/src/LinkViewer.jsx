import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeUrl, mergeStyles } from 'wix-rich-content-editor-common';
import styles from './link-viewer.scss';

class LinkViewer extends Component {

  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { styles, props } = this;
    const { componentData, anchorTarget, relValue, className, children } = props;
    const { url, target, rel } = componentData;
    const anchorProps = {
      href: normalizeUrl(url),
      target: target ? target : (anchorTarget || '_top'),
      rel: rel ? rel : (relValue || null),
      className: classNames(styles.link, className),
    };
    return <a {...anchorProps} >{children}</a>;
  }
}

export default LinkViewer;
