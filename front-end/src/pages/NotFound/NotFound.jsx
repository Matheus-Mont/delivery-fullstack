import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone-100
        px-4 py-12"
    >
      <div className="w-full max-w-md text-center">
        <p
          className="font-display text-6xl font-semibold tabular-nums
            text-amber-600"
        >
          404
        </p>
        <h1
          className="mt-4 font-display text-2xl font-semibold tracking-tight
            text-stone-900"
        >
          Essa página não existe
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          O endereço pode estar errado ou o pedido não está mais disponível.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={ () => navigate('/login') }>
            Voltar para o início
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
