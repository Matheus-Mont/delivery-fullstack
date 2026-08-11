import React, { useEffect, useState } from 'react';
import PageShell from '../../components/UI/PageShell';
import OrdersCard from '../../components/OrdersCard';
import { EmptyState } from '../../components/UI/Table';
import { getSellerOrders } from '../../services/api';

function SellerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [orders, setOrders] = useState([]);

  const ordersButton = {
    name: 'Pedidos',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'seller/orders',
  };

  const getAllOrders = async () => {
    const allOrders = await getSellerOrders(user.token, userId.id);
    setOrders(allOrders);
  };

  const SELLER = 'seller';

  useEffect(() => {
    getAllOrders();
  }, []);

  const hasOrders = !orders.status && orders.length > 0;

  return (
    <PageShell
      buttons={ [ordersButton] }
      userName={ user.name }
      title="Pedidos recebidos"
      subtitle="Aprove, prepare e despache os pedidos da sua carteira."
    >
      {hasOrders ? (
        <OrdersCard orders={ orders } role={ SELLER } />
      ) : (
        <EmptyState
          title="Nenhum pedido por enquanto"
          description="Assim que um cliente finalizar a compra, ele aparece aqui."
        />
      )}
    </PageShell>
  );
}

export default SellerOrders;
