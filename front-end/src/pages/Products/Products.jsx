import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../../components/UI/PageShell';
import Button from '../../components/UI/Button';
import { getProducts } from '../../services/api';
import Product from '../../components/Product';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const valitadeUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      localStorage.clear();
      navigate('/login');
    }
    const allProducts = await getProducts(user.token);
    if (!allProducts[0]) {
      localStorage.clear();
      navigate('/login');
    }
    setUserName(user.name);
    return allProducts;
  };

  const getAllProducts = async () => {
    const productsList = await valitadeUser();
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
      const newProducts = productsList.map((e) => ({ ...e, quantity: 0 }));
      setProducts(newProducts);
      setIsLoading(false);
      return newProducts;
    }
    setIsLoading(false);
    return products;
  };

  const sendToCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(products));
    localStorage.setItem('totalPrice', totalPrice);
    navigate('/customer/checkout');
  };

  const totalPriceSum = (arr) => (
    arr.reduce((acc, curr) => (curr.quantity * +curr.price) + acc, 0)
  );

  const addToCart = (id, value) => {
    const newArray = [...products];
    const teste = newArray.findIndex((e) => e.id === id);
    newArray[teste].quantity = value;
    setProducts([...newArray]);
    setTotalPrice(totalPriceSum(newArray).toFixed(2));
    localStorage.setItem('cart', JSON.stringify(products));
    localStorage.setItem('totalPrice', totalPrice);
  };

  const buttons = [
    { name: 'Produtos',
      role: 'customer/products',
      dataId: 'customer_products__element-navbar-link-products' },
    { name: 'Meus pedidos',
      role: 'customer/orders',
      dataId: 'customer_products__element-navbar-link-orders' },
  ];

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  const setCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      return localStorage.setItem('cart', JSON.stringify([]));
    }
    setTotalPrice(totalPriceSum(cart).toFixed(2));

    return setProducts(cart);
  };

  useEffect(() => {
    setCart();
    getAllProducts();
  }, []);

  return (
    <PageShell
      buttons={ buttons }
      userName={ userName }
      title="Produtos"
      subtitle="Escolha as bebidas e ajuste as quantidades."
      actions={ (
        <Button
          size="lg"
          onClick={ sendToCheckout }
          data-testid="customer_products__button-cart"
          disabled={ totalPrice === '0.00' }
        >
          {'Ver carrinho · R$ '}
          <span
            className="tabular-nums"
            data-testid="customer_products__checkout-bottom-value"
          >
            {convertPrice(totalPrice)}
          </span>
        </Button>
      ) }
    >
      <div
        className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2
          lg:grid-cols-3 xl:grid-cols-4"
      >
        {!isLoading && products.map((e) => (
          <Product key={ e.id } product={ e } addToCart={ addToCart } />
        ))}
      </div>
    </PageShell>
  );
}

export default Products;
