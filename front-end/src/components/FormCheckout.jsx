import React from 'react';
import PropTypes from 'prop-types';
import GenericInput, { fieldClass } from './GenericInput';
import GenericButton from './GenericButton';
import GenericSelect from './GenericSelect';

function FormCheckout({
  seller,
  setSeller,
  address,
  setAddress,
  houseNum,
  setHouseNum,
  sellers,
  handleSubmitBtn,
}) {
  const handleChangeSeller = ({ target }) => {
    setSeller(target.value);
  };

  const handleChangeAddress = ({ target }) => {
    setAddress(target.value);
  };

  const handleChangeHouseNum = ({ target }) => {
    setHouseNum(target.value);
  };

  return (
    <section
      className="rounded-xl border border-stone-200 bg-white p-5 shadow-card
        sm:p-6"
    >
      <h2
        className="font-display text-lg font-semibold tracking-tight
          text-stone-900"
      >
        Endereço para entrega
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Escolha quem vai atender e informe onde deixar o pedido.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <GenericSelect
            id="customer_checkout__select-seller"
            name="seller"
            label="Pessoa vendedora"
            value={ seller }
            onChange={ handleChangeSeller }
            optionsList={ sellers }
          />
        </div>
        <div className="sm:col-span-3">
          <GenericInput
            id="customer_checkout__input-address"
            name="address"
            type="text"
            label="Endereço"
            value={ address }
            placeholder="Rua, avenida, bairro"
            onChange={ handleChangeAddress }
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="customer_checkout__input-addressNumber"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Número
          </label>
          <input
            id="customer_checkout__input-addressNumber"
            type="number"
            value={ houseNum }
            onChange={ handleChangeHouseNum }
            min="0"
            placeholder="000"
            className={ fieldClass }
            data-testid="customer_checkout__input-addressNumber"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <GenericButton
          name="Finalizar pedido"
          id="customer_checkout__button-submit-order"
          size="lg"
          fullWidth={ false }
          onClick={ handleSubmitBtn }
          disabled={ false }
        />
      </div>
    </section>
  );
}

FormCheckout.propTypes = {
  seller: PropTypes.number.isRequired,
  setSeller: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  // houseNum: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]).isRequired,
  houseNum: PropTypes.string.isRequired,
  setHouseNum: PropTypes.func.isRequired,
  handleSubmitBtn: PropTypes.func.isRequired,
  sellers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

export default FormCheckout;
