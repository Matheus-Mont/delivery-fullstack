import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TableAdminManageUsers from '../../components/TableAdminManageUsers';
import PageShell from '../../components/UI/PageShell';
import { EmptyState } from '../../components/UI/Table';
import { deleteUser, getUsers, postUserAdmin } from '../../services/api';
import FormAdminRegisterUsers from '../../components/FormAdminRegisterUsers';
import 'react-toastify/dist/ReactToastify.css';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const [removedUser, setRemovedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Selecione');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  const manageUserButton = {
    name: 'Gerenciar Usuários',
    dataId: 'customer_products__element-navbar-link-orders',
    role: 'admin/manage',
  };

  const getAllUsers = async () => {
    const allUsers = await getUsers(user.token);
    const allUsersFiltered = allUsers.filter((e) => e.role !== 'administrator');
    const usersList = allUsersFiltered.map((e) => (
      e.role === 'customer'
        ? { ...e, role: 'Cliente' } : { ...e, role: 'P. Vendedora' }
    ));
    setUsers(usersList);
    setRemovedUser(false);
  };

  const removeUser = async (id, roleUser) => {
    if (roleUser !== 'administrator' || id !== 1) {
      await deleteUser(user.token, id);
      setRemovedUser(true);
    }
  };

  const INVALID = 409;

  const handleSubmitBtn = async () => {
    const userData = {
      name,
      email,
      password,
      role,
    };

    const response = await postUserAdmin(user.token, userData);
    if (response.status === INVALID) {
      setErrorMessage(true);
      return toast.error('Email já cadastrado!', { position: 'top-right' });
    }
    setErrorMessage(false);
    getAllUsers();
    setName('');
    setEmail('');
    setPassword('');
    setRole('Selecione');
    setBtnIsDisabled(true);
  };

  useEffect(() => {
    getAllUsers();
  }, [removedUser]);

  return (
    <PageShell
      buttons={ [manageUserButton] }
      userName={ user.name }
      title="Gerenciar pessoas usuárias"
      subtitle="Cadastre novas contas e administre quem tem acesso."
    >
      <div className="flex flex-col gap-6">
        <FormAdminRegisterUsers
          name={ name }
          setName={ setName }
          email={ email }
          setEmail={ setEmail }
          password={ password }
          setPassword={ setPassword }
          role={ role }
          setRole={ setRole }
          handleSubmitBtn={ handleSubmitBtn }
          btnIsDisabled={ btnIsDisabled }
          setBtnIsDisabled={ setBtnIsDisabled }
        />

        {errorMessage && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p
              data-testid="admin_manage__element-invalid-register"
              className="text-center text-sm font-medium text-red-700"
            >
              Cadastro não registrado. Confira os dados e tente novamente.
            </p>
          </div>
        )}

        <section>
          <h2
            className="mb-3 font-display text-lg font-semibold tracking-tight
              text-stone-900"
          >
            Pessoas cadastradas
          </h2>
          {!users.status && users.length > 0 ? (
            <TableAdminManageUsers users={ users } removeUser={ removeUser } />
          ) : (
            <EmptyState
              title="Nenhuma pessoa cadastrada"
              description="Use o formulário acima para criar a primeira conta."
            />
          )}
        </section>

        <ToastContainer />
      </div>
    </PageShell>
  );
}

export default AdminManage;
