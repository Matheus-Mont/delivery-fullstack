import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageShell from '../../components/UI/PageShell';
import TableDetails from '../../components/TableDetails';
import {
  getOrderDetails,
  patchDelivered,
  patchPrepare,
  patchToDeliver,
} from '../../services/api';
import DetailOrderHeader from '../../components/DetailOrderHeader';

function CustomerOrderDetails() {
  const navigate = useNavigate();
  const searchParams = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orderStatus, setOrderStatus] = useState('');
  const [order, setOrder] = useState({
    id: '',
    Seller: { name: '' },
    saleDate: '',
    Products: [],
    totalPrice: '',
    status: '',
  });

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  const getOrderInfo = async () => {
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const orderInfo = await getOrderDetails(user.token, searchParams.id);
    if (orderInfo.statusText) {
      navigate('/notfound');
    }
    setOrder(orderInfo);
    setOrderStatus(orderInfo.status);
    return orderInfo;
  };

  const handleDeliveredBtn = async () => {
    await patchDelivered(user.token, searchParams.id);
    setOrderStatus('Entregue');
  };

  const handlePrepareBtn = async () => {
    await patchPrepare(user.token, searchParams.id);
    setOrderStatus('Preparando');
  };

  const handleToDeliverBtn = async () => {
    await patchToDeliver(user.token, searchParams.id);
    setOrderStatus('Em Trânsito');
  };

  const productsButton = {
    name: 'Produtos',
    dataId: 'customer_products__element-navbar-link-products',
    role: 'customer/products',
  };
  const ordersButton = {
    name: 'Meus Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'customer/orders',
  };
  const sellerOrdersButton = {
    name: 'Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const isSeller = user.role === 'seller';

  return (
    <PageShell
      buttons={ isSeller ? [sellerOrdersButton] : [productsButton, ordersButton] }
      userName={ user.name }
      title="Detalhe do pedido"
      subtitle="Acompanhe os itens e o andamento da entrega."
    >
      <div className="flex flex-col gap-6">
        <DetailOrderHeader
          order={ order }
          handleDeliveredBtn={ handleDeliveredBtn }
          userRole={ user.role }
          handlePrepareBtn={ handlePrepareBtn }
          handleToDeliverBtn={ handleToDeliverBtn }
          orderStatus={ orderStatus }
        />

        <TableDetails orders={ order.Products } role={ user.role } />

        <div className="flex justify-end">
          <div
            className="flex w-full items-baseline justify-between gap-6
              rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-card
              sm:w-auto"
          >
            <span
              className="text-xs font-medium uppercase tracking-wider
                text-stone-500"
            >
              Total do pedido
            </span>
            <span
              className="font-display text-2xl font-semibold tabular-nums
                text-stone-900"
              data-testid={ `${user.role}_order_details__element-order-total-price` }
            >
              {`R$ ${convertPrice(order.totalPrice)}`}
            </span>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default CustomerOrderDetails;
