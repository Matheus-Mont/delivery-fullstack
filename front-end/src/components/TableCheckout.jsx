import PropTypes from 'prop-types';
import React from 'react';
import {
  TableShell, THead, TBody, Row, th, thNum, td, tdNum, tdIndex,
} from './UI/Table';

export default function TableCheckout({ orders, removeProduct }) {
  const dataId = 'customer_checkout__element-order-table-item-number-';
  const dataPrice = 'customer_checkout__element-order-table-unit-price-';

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  return (
    <TableShell caption="Itens do pedido">
      <THead>
        <tr>
          <th scope="col" className={ th }>#</th>
          <th scope="col" className={ th }>Descrição</th>
          <th scope="col" className={ thNum }>Qtd.</th>
          <th scope="col" className={ thNum }>Valor unitário</th>
          <th scope="col" className={ thNum }>Sub-total</th>
          <th scope="col" className={ `${th} text-right` }>
            <span className="sr-only">Remover item</span>
          </th>
        </tr>
      </THead>
      <TBody>
        {orders.map((e, index) => (
          <Row key={ e.id }>
            <td className={ tdIndex } data-testid={ `${dataId}${index}` }>
              { index + 1 }
            </td>
            <td
              className={ `${td} font-medium text-stone-900` }
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              { e.name }
            </td>
            <td
              className={ tdNum }
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              { e.quantity }
            </td>
            <td className={ tdNum } data-testid={ `${dataPrice}${index}` }>
              { convertPrice((+e.price).toFixed(2)) }
            </td>
            <td
              className={ `${tdNum} font-medium text-stone-900` }
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              { convertPrice((e.quantity * +e.price).toFixed(2)) }
            </td>
            <td
              className={ `${td} text-right` }
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              <button
                type="button"
                id={ e.id }
                onClick={ removeProduct }
                className="rounded-md px-2 py-1 text-sm font-medium text-red-700
                  transition-colors duration-150 hover:bg-red-50"
              >
                Remover
              </button>
            </td>
          </Row>
        ))}
      </TBody>
    </TableShell>
  );
}

TableCheckout.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
  removeProduct: PropTypes.func.isRequired,
};
