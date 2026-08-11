import React from 'react';
import PropTypes from 'prop-types';

const base = `inline-flex items-center justify-center gap-2 rounded-lg font-medium
  transition-colors duration-150 disabled:cursor-not-allowed`;

const variants = {
  primary: `bg-amber-600 text-white shadow-card hover:bg-amber-700
    disabled:bg-stone-300 disabled:text-stone-500 disabled:shadow-none`,
  secondary: `bg-white text-stone-700 border border-stone-300 shadow-card
    hover:bg-stone-100 hover:border-stone-400
    disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none`,
  ghost: `bg-transparent text-stone-600 hover:bg-stone-200 hover:text-stone-900
    disabled:text-stone-400`,
  danger: `bg-white text-red-700 border border-red-200 hover:bg-red-50
    hover:border-red-300 disabled:text-stone-400 disabled:border-stone-200`,
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

function Button({
  children,
  variant,
  size,
  type,
  className,
  fullWidth,
  ...rest
}) {
  const width = fullWidth ? 'w-full' : '';
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={ type } className={ classes } { ...rest }>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  type: 'button',
  className: '',
  fullWidth: false,
};

export default Button;
