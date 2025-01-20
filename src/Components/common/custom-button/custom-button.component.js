/** @format */

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './custom-button.styles.scss';

function CustomButton({
  children,
  type,
  isDisabled,
  isNormal,
  isClear,
  onClick,
  isHidden,
}) {
  return (
    <div className='custom-button-container'>
      <button
        className={`${
          isDisabled
            ? 'custom-button-disabled'
            : isNormal
            ? 'custom-button-normal'
            : isClear
            ? 'custom-button-clear'
            : 'custom-button-submit'
        } custom-button`}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        hidden={isHidden}
      >
        {children}
      </button>
    </div>
  );
}

// PropTypes validation (optional)
CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  isDisabled: PropTypes.bool,
  isNormal: PropTypes.bool,
  isClear: PropTypes.bool,
  onClick: PropTypes.func,
  isHidden: PropTypes.bool,
};

export default CustomButton;
