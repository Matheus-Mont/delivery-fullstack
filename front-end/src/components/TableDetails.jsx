import React from 'react';
import PropTypes from 'prop-types';
import {
  TableShell, THead, TBody, Row, th, thNum, td, tdNum, tdIndex,
} from './UI/Table';

export default function TableDetails({ orders, role }) {
  const fId = 'customer_order_details__element-order-table-item-number-';
  const dataPrice = 'customer_order_details__element-order-table-sub-total-';

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
        </tr>
      </THead>
      <TBody>
        {orders.map((e, i) => (
          <Row key={ e.id }>
            <td className={ tdIndex } data-testid={ `${fId}${i}` }>
              { i + 1 }
            </td>
            <td
              className={ `${td} font-medium text-stone-900` }
              data-testid={ `${role}_order_details__element-order-table-name-${i}` }
            >
              { e.name }
            </td>
            <td
              className={ tdNum }
              data-testid={ `${role}_order_details__element-order-table-quantity-${i}` }
            >
              { e.SaleProduct.quantity }
            </td>
            <td className={ tdNum } data-testid={ `${dataPrice}${i}` }>
              { convertPrice((+e.price).toFixed(2)) }
            </td>
            <td
              className={ `${tdNum} font-medium text-stone-900` }
              data-testid={ `${role}_order_details__element-order-total-price-${i}` }
            >
              { convertPrice((e.SaleProduct.quantity * +e.price).toFixed(2)) }
            </td>
          </Row>
        ))}
      </TBody>
    </TableShell>
  );
}

TableDetails.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })).isRequired,
  role: PropTypes.string.isRequired,
};
