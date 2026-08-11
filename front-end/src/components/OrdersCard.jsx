import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './UI/StatusBadge';

function OrdersCard({ orders, role }) {
  const navigate = useNavigate();

  const handleClick = (rota, id) => navigate(`/${rota}/orders/${id}`);

  const handleDate = (saleDate) => {
    const dataAmericana = saleDate.split('T', 1).toString();
    const dataBrasileira = dataAmericana.split('-').reverse().join('/');
    return dataBrasileira;
  };

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <ul
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4"
    >
      {orders.map(
        ({ id, deliveryAddress, deliveryNumber, saleDate, status, totalPrice }) => (
          <li key={ id }>
            <button
              type="button"
              onClick={ () => handleClick(role, id) }
              className="group flex h-full w-full flex-col gap-4 rounded-xl
                border border-stone-200 bg-white p-5 text-left shadow-card
                transition-all duration-150 hover:-translate-y-0.5
                hover:border-amber-300 hover:shadow-raised"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="text-xs font-medium uppercase tracking-wider
                      text-stone-500"
                  >
                    Pedido
                  </span>
                  <p
                    className="font-display text-lg font-semibold tabular-nums
                      text-stone-900"
                    data-testid={ `${role}_orders__element-order-id-${id}` }
                  >
                    {id}
                  </p>
                </div>
                <StatusBadge
                  status={ status }
                  data-testid={ `${role}_orders__element-delivery-status-${id}` }
                />
              </div>

              <div className="flex items-end justify-between gap-3">
                <div>
                  <span
                    className="text-xs font-medium uppercase tracking-wider
                      text-stone-500"
                  >
                    Data
                  </span>
                  <p
                    className="text-sm tabular-nums text-stone-700"
                    data-testid={ `${role}_orders__element-order-date-${id}` }
                  >
                    {handleDate(saleDate)}
                  </p>
                </div>
                <p
                  className="font-display text-xl font-semibold tabular-nums
                    text-stone-900"
                  data-testid={ `${role}_orders__element-card-price-${id}` }
                >
                  {`R$ ${convertPrice(totalPrice)}`}
                </p>
              </div>

              {role === 'seller' && (
                <p
                  className="truncate border-t border-stone-100 pt-3 text-sm
                    text-stone-500"
                  data-testid={ `${role}_orders__element-card-address-${id}` }
                >
                  {`${deliveryAddress}, ${deliveryNumber}`}
                </p>
              )}
            </button>
          </li>
        ),
      )}
    </ul>
  );
}

OrdersCard.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })).isRequired,
  role: PropTypes.string.isRequired,
};

export default OrdersCard;
