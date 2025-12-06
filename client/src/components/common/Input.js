import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
  autoComplete,
  ariaLabel,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = [
    'input-field',
    error ? 'input-error' : '',
    disabled ? 'input-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClasses}
          autoComplete={autoComplete}
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && (
        <span id={`${name}-error`} className="input-error-message" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${name}-helper`} className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Input;
