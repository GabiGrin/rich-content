import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'draft-js/dist/Draft.css'; // must import before custom styles
import Styles from '~/Styles/rich-content-editor.scss';
import 'normalize.css';
import Preview from './Preview';

export default class RichContentViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: props.initialState || {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialState !== nextProps.initialState) {
      this.setState({ raw: nextProps.initialState });
    }
  }

  render() {
    const wrapperClassName = classNames(Styles.wrapper, {
      [Styles.desktop]: !this.props.platform || this.props.platform === 'desktop',
    });
    return (
      <div className={wrapperClassName}>
        <div className={Styles.editor}>
          <Preview raw={this.state.raw}/>
        </div>
      </div>
    );
  }
}

RichContentViewer.propTypes = {
  initialState: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  platform: PropTypes.string,
};