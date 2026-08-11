import React from 'react';
import PropTypes from 'prop-types';

export const ORDER_STEPS = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

const tones = {
  Pendente: 'bg-amber-100 text-amber-800 ring-amber-600/20',
  Preparando: 'bg-sky-100 text-sky-800 ring-sky-600/20',
  'Em Trânsito': 'bg-violet-100 text-violet-800 ring-violet-600/20',
  Entregue: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
};

const fallback = 'bg-stone-100 text-stone-700 ring-stone-500/20';

function StatusBadge({ status, className, ...rest }) {
  const tone = tones[status] || fallback;

  return (
    <span
      className={ `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
        text-xs font-medium ring-1 ring-inset whitespace-nowrap
        ${tone} ${className}`.replace(/\s+/g, ' ').trim() }
      { ...rest }
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  className: PropTypes.string,
};

StatusBadge.defaultProps = {
  status: '',
  className: '',
};

export default StatusBadge;
