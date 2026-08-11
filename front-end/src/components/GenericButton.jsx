import React from 'react';
import PropTypes from 'prop-types';
import Button from './UI/Button';

function GenericButton({ name, id, onClick, disabled, variant, size, fullWidth }) {
  return (
    <Button
      type="submit"
      id={ id }
      data-testid={ id }
      onClick={ onClick }
      disabled={ disabled }
      variant={ variant }
      size={ size }
      fullWidth={ fullWidth }
    >
      {name}
    </Button>
  );
}

GenericButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
};

GenericButton.defaultProps = {
  variant: 'primary',
  size: 'md',
  fullWidth: true,
};

export default GenericButton;
