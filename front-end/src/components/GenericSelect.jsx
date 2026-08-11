import React from 'react';
import PropTypes from 'prop-types';
import { fieldClass } from './GenericInput';

function GenericSelect(props) {
  const { name, value, id, infoClass, onChange, optionsList, label } = props;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={ id }
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          {label}
        </label>
      )}
      <select
        id={ id }
        data-testid={ id }
        name={ name }
        value={ value }
        required
        className={ infoClass || fieldClass }
        onChange={ onChange }
      >
        {optionsList.map((o) => (
          <option key={ o.id } value={ o.id }>
            { o.name }
          </option>
        ))}
      </select>
    </div>
  );
}

GenericSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string.isRequired,
  infoClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  optionsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

GenericSelect.defaultProps = {
  infoClass: '',
  label: '',
};

export default GenericSelect;
