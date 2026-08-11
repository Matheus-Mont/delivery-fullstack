import PropTypes from 'prop-types';
import React from 'react';
import {
  TableShell, THead, TBody, Row, th, td, tdIndex,
} from './UI/Table';

const roleTone = {
  Cliente: 'bg-sky-100 text-sky-800 ring-sky-600/20',
  'P. Vendedora': 'bg-amber-100 text-amber-800 ring-amber-600/20',
};

export default function TableAdminManageUsers({ users, removeUser }) {
  return (
    <TableShell caption="Pessoas usuárias cadastradas">
      <THead>
        <tr>
          <th scope="col" className={ th }>#</th>
          <th scope="col" className={ th }>Nome</th>
          <th scope="col" className={ th }>E-mail</th>
          <th scope="col" className={ th }>Tipo</th>
          <th scope="col" className={ `${th} text-right` }>
            <span className="sr-only">Excluir</span>
          </th>
        </tr>
      </THead>
      <TBody>
        {users.map(({ id, name, email, role }, index) => (
          <Row key={ id }>
            <td
              className={ tdIndex }
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              { index + 1 }
            </td>
            <td
              className={ `${td} font-medium text-stone-900` }
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              { name }
            </td>
            <td
              className={ `${td} text-stone-500` }
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              { email }
            </td>
            <td
              className={ td }
              data-testid={ `admin_manage__element-user-table-role-<index>${index}` }
            >
              <span
                className={ `inline-flex rounded-full px-2.5 py-1 text-xs
                  font-medium ring-1 ring-inset whitespace-nowrap
                  ${roleTone[role] || 'bg-stone-100 text-stone-700 ring-stone-500/20'}`
                  .replace(/\s+/g, ' ').trim() }
              >
                { role }
              </span>
            </td>
            <td
              className={ `${td} text-right` }
              data-testid={ `admin_manage__element-user-table-remove-${index}` }
            >
              <button
                type="button"
                id={ id }
                onClick={ () => removeUser(id, role) }
                className="rounded-md px-2 py-1 text-sm font-medium text-red-700
                  transition-colors duration-150 hover:bg-red-50"
              >
                Remover
              </button>
            </td>
          </Row>
        ))}
      </TBody>
    </TableShell>
  );
}

TableAdminManageUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  removeUser: PropTypes.func.isRequired,
};
