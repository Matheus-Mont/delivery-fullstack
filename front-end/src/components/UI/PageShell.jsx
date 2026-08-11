import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

function PageShell({ buttons, userName, title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header buttons={ buttons } userName={ userName } />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {(title || actions) && (
          <div
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end
              sm:justify-between"
          >
            <div>
              {title && (
                <h1
                  className="font-display text-2xl font-semibold tracking-tight
                    text-stone-900 sm:text-3xl"
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
              )}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

PageShell.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    dataId: PropTypes.string,
  })).isRequired,
  userName: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

PageShell.defaultProps = {
  title: '',
  subtitle: '',
  actions: null,
};

export default PageShell;
