import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Product({ product, addToCart }) {
  const { id, name, urlImage, price, quantity } = product;
  const [quantities, setQuantities] = useState(quantity);

  const handleSumBtn = () => {
    setQuantities(quantities + 1);
    addToCart(id, quantities + 1);
  };

  const handleDeductBtn = () => {
    if (quantities > 0) {
      setQuantities(quantities - 1);
      addToCart(id, quantities - 1);
    }
  };

  const handleChangeQnt = ({ target }) => {
    setQuantities(+target.value);
    addToCart(id, +target.value);
  };

  const convertPrice = (priceWithDot) => {
    const priceWithComma = priceWithDot.toString().replace('.', ',');
    return priceWithComma;
  };

  const stepBtn = `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
    border border-stone-300 bg-white text-base font-medium text-stone-700
    transition-colors duration-150 hover:border-stone-400 hover:bg-stone-100
    disabled:text-stone-300`;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-xl border
        border-stone-200 bg-white shadow-card transition-shadow duration-150
        hover:shadow-raised"
    >
      <div className="aspect-square overflow-hidden bg-stone-100">
        <img
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="h-full w-full object-contain p-4 transition-transform
            duration-200 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-stone-100 p-4">
        <h3
          className="text-sm font-medium leading-snug text-stone-900"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h3>

        <p
          className="font-display text-xl font-semibold tabular-nums
            text-stone-900"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          <span className="mr-1 text-sm font-normal text-stone-500">R$</span>
          {convertPrice((+price).toFixed(2))}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-xs font-medium uppercase tracking-wider
            text-stone-500"
          >
            Unidades
          </span>
          <div className="flex items-center gap-1.5">
            <button
              className={ stepBtn }
              type="button"
              onClick={ handleDeductBtn }
              disabled={ quantities <= 0 }
              aria-label={ `Remover uma unidade de ${name}` }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
            >
              −
            </button>
            <input
              type="number"
              value={ quantities }
              onChange={ handleChangeQnt }
              min="0"
              aria-label={ `Quantidade de ${name}` }
              className="h-8 w-12 rounded-lg border border-stone-300 bg-white
                text-center text-sm tabular-nums text-stone-900
                focus:border-amber-600 focus:outline-none focus:ring-1
                focus:ring-amber-600"
              data-testid={ `customer_products__input-card-quantity-${id}` }
            />
            <button
              className={ stepBtn }
              type="button"
              onClick={ handleSumBtn }
              aria-label={ `Adicionar uma unidade de ${name}` }
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Product;
