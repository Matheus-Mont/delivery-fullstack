import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import GenericInput from '../../components/GenericInput';
import GenericButton from '../../components/GenericButton';
import { postLogin, postVerifyLogin } from '../../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyInput = (emailC, passwordC) => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(emailC);
    const passwordMinLength = 5;
    if (emailVerified && passwordC.length > passwordMinLength) {
      setBtnIsDisabled(false);
      return;
    }
    setBtnIsDisabled(true);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput(target.value, password);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput(email, target.value);
  };

  const handleLoginClick = async () => {
    const response = await postLogin({ email, password });
    if (!response.token) {
      setErrorMessage(true);
      return 'fail';
    }
    const { id, name, email: userEmail, role, token } = response;
    localStorage.setItem('user', JSON.stringify({ name, email: userEmail, role, token }));
    localStorage.setItem('userId', JSON.stringify({ id }));

    switch (response.role) {
    case 'administrator':
      navigate('/admin/manage');
      break;
    case 'seller':
      navigate('/seller/orders');
      break;
    case 'customer':
      navigate('/customer/products');
      break;
    default:
      navigate('/customer/notfound');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const verifyToken = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !Object.keys(user).includes('token')) {
      return null;
    }
    const response = await postVerifyLogin(user.token);
    if (response.status) {
      return null;
    }
    switch (user.role) {
    case 'administrator':
      navigate('/admin/manage');
      break;
    case 'seller':
      navigate('/seller/orders');
      break;
    case 'customer':
      navigate('/customer/products');
      break;
    default:
      navigate('/customer/notfound');
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone-100
        px-4 py-12"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            className="mx-auto h-20 w-auto"
            src={ logo }
            alt=""
          />
          <h1
            className="mt-5 font-display text-3xl font-semibold tracking-tight
              text-stone-900"
          >
            Delivery App
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Bebida gelada na porta de casa.
          </p>
        </div>

        <div
          className="rounded-2xl border border-stone-200 bg-white p-6
            shadow-raised sm:p-8"
        >
          <div className="space-y-4">
            <GenericInput
              id="common_login__input-email"
              name="email"
              type="email"
              value={ email }
              label="E-mail"
              placeholder="voce@email.com"
              onChange={ handleChangeEmail }
            />
            <GenericInput
              id="common_login__input-password"
              name="password"
              type="password"
              value={ password }
              label="Senha"
              placeholder="Sua senha"
              onChange={ handleChangePassword }
            />
          </div>

          <div className="mt-6 space-y-3">
            <GenericButton
              name="Entrar"
              id="common_login__button-login"
              size="lg"
              disabled={ btnIsDisabled }
              onClick={ handleLoginClick }
            />
            <GenericButton
              name="Criar conta"
              id="common_login__button-register"
              variant="secondary"
              size="lg"
              disabled={ false }
              onClick={ handleRegisterClick }
            />
          </div>

          {errorMessage && (
            <div
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
            >
              <p
                data-testid="common_login__element-invalid-email"
                className="text-center text-sm font-medium text-red-700"
              >
                E-mail ou senha incorretos. Confira e tente de novo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
