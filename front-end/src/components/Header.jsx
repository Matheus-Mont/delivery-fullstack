import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ buttons, userName }) {
  const navigate = useNavigate();

  const checkoutButton = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClick = (rota) => navigate(`/${rota}`);

  const initials = (userName || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-stone-900 text-stone-100">
      <div
        className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6
          lg:px-8 md:flex-row md:items-center md:justify-between"
      >
        <nav className="flex items-center gap-1" aria-label="Principal">
          <span
            className="mr-3 hidden font-display text-sm font-semibold
              tracking-tight text-amber-500 sm:block"
          >
            Delivery
          </span>
          {buttons.map((e) => (
            <button
              key={ e.name }
              type="button"
              data-testid={ e.dataId }
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-300
                transition-colors duration-150 hover:bg-stone-800
                hover:text-white"
              onClick={ () => handleClick(e.role) }
            >
              {e.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="hidden h-8 w-8 shrink-0 items-center justify-center
              rounded-full bg-amber-600 text-xs font-semibold text-white sm:flex"
          >
            {initials}
          </span>
          <p
            className="truncate text-sm font-medium text-stone-200"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {userName}
          </p>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            className="rounded-lg border border-stone-700 px-3 py-2 text-sm
              font-medium text-stone-300 transition-colors duration-150
              hover:border-stone-600 hover:bg-stone-800 hover:text-white"
            onClick={ checkoutButton }
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    dataId: PropTypes.string,
  })).isRequired,
  userName: PropTypes.string.isRequired,
};

export default Header;
