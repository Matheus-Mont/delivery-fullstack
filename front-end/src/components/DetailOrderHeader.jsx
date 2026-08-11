import React from 'react';
import PropTypes from 'prop-types';
import Button from './UI/Button';
import StatusBadge from './UI/StatusBadge';
import OrderStatusTrack from './UI/OrderStatusTrack';

function Meta({ label, children, testId }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-stone-900" data-testid={ testId }>
        {children}
      </dd>
    </div>
  );
}

Meta.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string.isRequired,
};

function DetailOrderHeader({
  order,
  handleDeliveredBtn,
  handlePrepareBtn,
  handleToDeliverBtn,
  userRole,
  orderStatus,
}) {
  const handleDate = (saleDate) => {
    const dataAmericana = saleDate.split('T', 1).toString();
    const dataBrasileira = dataAmericana.split('-').reverse().join('/');
    return dataBrasileira;
  };

  return (
    <section
      className="rounded-xl border border-stone-200 bg-white p-5 shadow-card
        sm:p-6"
    >
      <div
        className="flex flex-col gap-4 border-b border-stone-100 pb-5
          sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <h2
            className="font-display text-xl font-semibold tracking-tight
              text-stone-900"
            data-testid={
              `${userRole}_order_details__element-order-details-label-order-id`
            }
          >
            {'Pedido '}
            <span className="tabular-nums">
              {order.id ? `#${order.id}` : ''}
            </span>
          </h2>
          <StatusBadge
            status={ orderStatus }
            data-testid={
              `${userRole}_order_details__element-order-details-label-delivery-status`
            }
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {userRole === 'customer' ? (
            <Button
              onClick={ handleDeliveredBtn }
              data-testid="customer_order_details__button-delivery-check"
              name="Delivery Button"
              disabled={ orderStatus !== 'Em Trânsito' }
            >
              Marcar como entregue
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={ handlePrepareBtn }
                data-testid="seller_order_details__button-preparing-check"
                name="Prepare Button"
                disabled={ orderStatus !== 'Pendente' }
              >
                Preparar pedido
              </Button>
              <Button
                onClick={ handleToDeliverBtn }
                data-testid="seller_order_details__button-dispatch-check"
                name="To Deliver Button"
                disabled={ orderStatus !== 'Preparando' }
              >
                Saiu para entrega
              </Button>
            </>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-3">
        {userRole === 'customer' && (
          <Meta
            label="Pessoa vendedora"
            testId="customer_order_details__element-order-details-label-seller-name"
          >
            {order.Seller.name}
          </Meta>
        )}
        <Meta
          label="Data do pedido"
          testId={
            `${userRole}_order_details__element-order-details-label-order-date`
          }
        >
          {order.saleDate ? handleDate(order.saleDate) : '—'}
        </Meta>
      </dl>

      <div className="border-t border-stone-100 pt-5">
        <OrderStatusTrack status={ orderStatus } />
      </div>
    </section>
  );
}

DetailOrderHeader.propTypes = {
  handleDeliveredBtn: PropTypes.func.isRequired,
  handlePrepareBtn: PropTypes.func.isRequired,
  handleToDeliverBtn: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Seller: PropTypes.shape({
      name: PropTypes.string,
    }),
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default DetailOrderHeader;
