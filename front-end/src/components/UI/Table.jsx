import React from 'react';
import PropTypes from 'prop-types';

export const th = `px-4 py-3 text-left text-xs font-semibold uppercase
  tracking-wider text-stone-500 whitespace-nowrap`;

export const thNum = `${th} text-right`;

export const td = 'px-4 py-3 text-sm text-stone-700 align-middle';

export const tdNum = `${td} text-right tabular-nums`;

export const tdIndex = `${td} text-stone-400 tabular-nums w-12`;

export function TableShell({ children, caption }) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-stone-200 bg-white
        shadow-card"
    >
      <table className="min-w-full divide-y divide-stone-200">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

TableShell.propTypes = {
  children: PropTypes.node.isRequired,
  caption: PropTypes.string,
};

TableShell.defaultProps = {
  caption: '',
};

export function TBody({ children }) {
  return (
    <tbody className="divide-y divide-stone-100">
      {children}
    </tbody>
  );
}

TBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export function THead({ children }) {
  return <thead className="bg-stone-50">{children}</thead>;
}

THead.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Row({ children }) {
  return (
    <tr className="transition-colors duration-100 hover:bg-amber-50/40">
      {children}
    </tr>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export function EmptyState({ title, description }) {
  return (
    <div
      className="rounded-xl border border-dashed border-stone-300 bg-white
        px-6 py-12 text-center"
    >
      <p className="font-display text-base font-medium text-stone-700">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-stone-500">{description}</p>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

EmptyState.defaultProps = {
  description: '',
};
