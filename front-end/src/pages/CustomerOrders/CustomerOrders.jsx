import React, { useEffect, useState } from 'react';
import PageShell from '../../components/UI/PageShell';
import OrdersCard from '../../components/OrdersCard';
import { EmptyState } from '../../components/UI/Table';
import { getCustomerOrders } from '../../services/api';

function CustomerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [orders, setOrders] = useState([]);

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

  const getAllOrders = async () => {
    const allOrders = await getCustomerOrders(user.token, userId.id);
    setOrders(allOrders);
  };

  const CUSTOMER = 'customer';

  useEffect(() => {
    getAllOrders();
  }, []);

  const hasOrders = !orders.status && orders.length > 0;

  return (
    <PageShell
      buttons={ [productsButton, ordersButton] }
      userName={ user.name }
      title="Meus pedidos"
      subtitle="Toque em um pedido para ver os itens e o andamento."
    >
      {hasOrders ? (
        <OrdersCard orders={ orders } role={ CUSTOMER } />
      ) : (
        <EmptyState
          title="Você ainda não fez nenhum pedido"
          description="Escolha suas bebidas na aba Produtos para começar."
        />
      )}
    </PageShell>
  );
}

export default CustomerOrders;
