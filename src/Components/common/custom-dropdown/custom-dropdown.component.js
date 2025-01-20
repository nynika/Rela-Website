/** @format */

import React from 'react';
import Select from 'react-select';
import './custom-dropdown.styles.scss';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    minHeight: '34px',
    height: '34px',
    margin: '10px 0',
    outline: 'none',
    '&:hover': {
      border: '2px solid #ffd580',
      boxShadow: '0 0 8px 0 #ffd580',
    },
    border: state.isFocused ? '2px solid #ffd580' : '1px solid #aaa',
    boxShadow: state.isFocused ? '0 0 8px 0 #ffd580' : 'none',
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    '&:hover': {
      background: 'whitesmoke',
      color: 'black',
    },
    background: state.isFocused ? '#ffcc99' : 'none',
    color: state.isFocused ? 'black' : 'inherit',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

function CustomDropdown({
  label,
  name,
  value,
  placeholder = 'Select an option',
  options = [],
  disabled = false,
  required = false,
  mandatory,
  handleSelectChange,
  selectRef,
}) {
  return (
    <div className='custom-dropdown-container'>
      {label && (
        <label htmlFor={name} className='form-label'>
          {label}
          {(required || mandatory) && <span className='form-required'>*</span>}
        </label>
      )}
      <Select
        options={options}
        placeholder={placeholder}
        name={name}
        value={value}
        styles={customStyles}
        className='short-form-input'
        onChange={handleSelectChange}
        isDisabled={disabled}
        menuPortalTarget={document.body}
        ref={selectRef}
      />
    </div>
  );
}

export default CustomDropdown;
