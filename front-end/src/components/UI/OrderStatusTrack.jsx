import React from 'react';
import PropTypes from 'prop-types';
import { ORDER_STEPS } from './StatusBadge';

function OrderStatusTrack({ status }) {
  const current = ORDER_STEPS.indexOf(status);

  return (
    <ol className="flex items-start" aria-label="Progresso do pedido">
      {ORDER_STEPS.map((step, index) => {
        const done = current >= 0 && index <= current;
        const isCurrent = index === current;
        const connectorDone = current > index;

        return (
          <li
            key={ step }
            className={ `flex flex-1 flex-col items-center
              ${index === 0 ? 'items-start' : ''}
              ${index === ORDER_STEPS.length - 1 ? 'items-end' : ''}` }
            aria-current={ isCurrent ? 'step' : undefined }
          >
            <div className="flex w-full items-center">
              {index !== 0 && (
                <span
                  aria-hidden="true"
                  className={ `h-0.5 flex-1 transition-colors duration-300
                    ${connectorDone || isCurrent ? 'bg-amber-600' : 'bg-stone-200'}` }
                />
              )}
              <span
                aria-hidden="true"
                className={ `flex h-3.5 w-3.5 shrink-0 items-center justify-center
                  rounded-full ring-4 transition-colors duration-300
                  ${done
              ? 'bg-amber-600 ring-amber-600/15'
              : 'bg-stone-300 ring-transparent'}` }
              />
              {index !== ORDER_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={ `h-0.5 flex-1 transition-colors duration-300
                    ${connectorDone ? 'bg-amber-600' : 'bg-stone-200'}` }
                />
              )}
            </div>
            <span
              className={ `mt-2 text-xs whitespace-nowrap
                ${isCurrent
              ? 'font-semibold text-amber-700'
              : 'text-stone-500'}` }
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

OrderStatusTrack.propTypes = {
  status: PropTypes.string,
};

OrderStatusTrack.defaultProps = {
  status: '',
};

export default OrderStatusTrack;
