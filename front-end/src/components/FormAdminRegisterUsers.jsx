import React from 'react';
import PropTypes from 'prop-types';
import GenericInput, { fieldClass } from './GenericInput';
import GenericButton from './GenericButton';

function FormAdminRegisterUsers({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  handleSubmitBtn,
  btnIsDisabled,
  setBtnIsDisabled,
}) {
  const verifyInput = (emailC, passwordC, nameC, roleC) => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(emailC);
    const passwordMinLength = 6;
    const nameMinLength = 12;
    if (emailVerified && passwordC.length >= passwordMinLength
      && nameC.length >= nameMinLength && roleC !== 'Selecione') {
      setBtnIsDisabled(false);
      return;
    }
    setBtnIsDisabled(true);
  };

  const handleChangeName = ({ target }) => {
    setName(target.value);
    verifyInput(email, password, target.value, role);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput(target.value, password, name, role);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput(email, target.value, name, role);
  };

  const handleChangeRoles = ({ target }) => {
    setRole(target.value);
    verifyInput(email, password, name, target.value);
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
        Cadastrar nova pessoa usuária
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        O nome precisa ter ao menos 12 caracteres e a senha, 6.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GenericInput
          id="admin_manage__input-name"
          name="name"
          type="text"
          label="Nome"
          value={ name }
          placeholder="Nome e sobrenome"
          onChange={ handleChangeName }
        />
        <GenericInput
          id="admin_manage__input-email"
          name="email"
          type="email"
          label="E-mail"
          value={ email }
          placeholder="pessoa@email.com"
          onChange={ handleChangeEmail }
        />
        <GenericInput
          id="admin_manage__input-password"
          name="senha"
          type="password"
          label="Senha"
          value={ password }
          placeholder="Mínimo de 6 caracteres"
          onChange={ handleChangePassword }
        />
        <div className="w-full">
          <label
            htmlFor="admin_manage__select-role"
            className="mb-1.5 block text-sm font-medium text-stone-700"
          >
            Tipo
          </label>
          <select
            id="admin_manage__select-role"
            data-testid="admin_manage__select-role"
            name="role"
            value={ role }
            className={ fieldClass }
            onChange={ handleChangeRoles }
          >
            <option value="Selecione" disabled>
              Selecione
            </option>
            <option value="seller">
              Vendedor
            </option>
            <option value="customer">
              Cliente
            </option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <GenericButton
          name="Cadastrar"
          id="admin_manage__button-register"
          size="lg"
          fullWidth={ false }
          onClick={ handleSubmitBtn }
          disabled={ btnIsDisabled }
        />
      </div>
    </section>
  );
}

FormAdminRegisterUsers.propTypes = {
  btnIsDisabled: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  handleSubmitBtn: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setBtnIsDisabled: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default FormAdminRegisterUsers;
