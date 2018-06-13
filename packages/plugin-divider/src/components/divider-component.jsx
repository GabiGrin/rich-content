import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-editor-common';

import { getType, getConfig } from '../toolbar/selectors';
import DividerLine from './divider-line';
import styles from '../divider-viewer.scss';

class DividerComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = ({ componentData }) => {
    const config = getConfig(componentData);
    return {
      type: getType(componentData),
      size: config.size,
      alignment: config.alignment,
    };
  };

  render() {
    const styles = this.styles;
    const { type, size, alignment } = this.state;
    const className = classNames(
      styles['divider-container'],
      this.styles[`divider-container--${type}`],
      this.props.isMobile && this.styles['divider-container--mobile'],
      this.props.className
    );
    return (
      <div
        className={className}
        data-hook={`divider-${type}`}
      >
        <DividerLine
          type={type}
          size={size}
          isMobile={this.props.isMobile}
          alignment={alignment}
          styles={styles}
        />
      </div>
    );
  }
}

DividerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object,
  isMobile: PropTypes.bool
};

export default DividerComponent;
