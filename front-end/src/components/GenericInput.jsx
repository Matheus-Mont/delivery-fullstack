import React from 'react';
import PropTypes from 'prop-types';

export const fieldClass = `block w-full rounded-lg border border-stone-300
  bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400
  transition-colors duration-150 hover:border-stone-400
  focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600`;

function GenericInput(props) {
  const {
    name, type, value, label, id, infoClass, placeholder, onChange, hideLabel,
  } = props;

  return (
    <div className="w-full">
      <label
        htmlFor={ id }
        className={ hideLabel
          ? 'sr-only'
          : 'mb-1.5 block text-sm font-medium text-stone-700' }
      >
        {label}
      </label>
      <input
        id={ id }
        data-testid={ id }
        name={ name }
        type={ type }
        value={ value }
        autoComplete={ name }
        required
        className={ infoClass || fieldClass }
        placeholder={ placeholder }
        onChange={ onChange }
      />
    </div>
  );
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  infoClass: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hideLabel: PropTypes.bool,
};

GenericInput.defaultProps = {
  infoClass: '',
  hideLabel: false,
};

export default GenericInput;
