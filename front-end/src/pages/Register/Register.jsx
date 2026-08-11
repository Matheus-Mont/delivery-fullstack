import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import GenericInput from '../../components/GenericInput';
import GenericButton from '../../components/GenericButton';
import { postRegister } from '../../services/api';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyInput = (emailC, passwordC, nameC) => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(emailC);
    const passwordMinLength = 5;
    const nameMinLength = 12;
    if (emailVerified && passwordC.length > passwordMinLength
      && nameC.length >= nameMinLength) {
      setBtnIsDisabled(false);
      return;
    }
    setBtnIsDisabled(true);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput(target.value, password, name);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput(email, target.value, name);
  };

  const handleChangeName = ({ target }) => {
    setName(target.value);
    verifyInput(email, password, target.value);
  };

  const handleRegisterClick = async () => {
    const response = await postRegister({ name, email, password });
    if (!response.token) {
      setErrorMessage(true);
      return 'fail';
    }
    localStorage.setItem('user', JSON.stringify(response));
    navigate('/customer/products');
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone-100
        px-4 py-12"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img className="mx-auto h-20 w-auto" src={ logo } alt="" />
          <h1
            className="mt-5 font-display text-3xl font-semibold tracking-tight
              text-stone-900"
          >
            Criar conta
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Leva menos de um minuto.
          </p>
        </div>

        <div
          className="rounded-2xl border border-stone-200 bg-white p-6
            shadow-raised sm:p-8"
        >
          <div className="space-y-4">
            <GenericInput
              id="common_register__input-name"
              name="name"
              type="text"
              value={ name }
              label="Nome completo"
              placeholder="Seu nome completo"
              onChange={ handleChangeName }
            />
            <GenericInput
              id="common_register__input-email"
              name="email"
              type="email"
              label="E-mail"
              value={ email }
              placeholder="voce@email.com"
              onChange={ handleChangeEmail }
            />
            <GenericInput
              id="common_register__input-password"
              name="password"
              type="password"
              label="Senha"
              value={ password }
              placeholder="Mínimo de 6 caracteres"
              onChange={ handleChangePassword }
            />
          </div>

          <div className="mt-6">
            <GenericButton
              name="Cadastrar"
              id="common_register__button-register"
              size="lg"
              disabled={ btnIsDisabled }
              onClick={ handleRegisterClick }
            />
          </div>

          {errorMessage && (
            <div
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
            >
              <p
                data-testid="common_register__element-invalid_register"
                className="text-center text-sm font-medium text-red-700"
              >
                Não foi possível criar a conta. Esse e-mail já pode estar em uso.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
