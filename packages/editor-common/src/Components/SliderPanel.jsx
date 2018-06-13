import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from './SliderWithInput';
import styles from '../Styles/slider-panel.scss';

const SliderPanel = props => {
  const { theme, getValue, onChange, ...otherProps } = props;
  return (
    <div className={styles.sliderPanel}>
      <SliderWithInput
        {...otherProps}
        theme={theme}
        value={getValue(props)}
        onChange={onChange(props)}
      />
    </div>
  );
};

SliderPanel.propTypes = {
  getValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default SliderPanel;
