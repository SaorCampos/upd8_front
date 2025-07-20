import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

function Table({ columns, data, columnAliases, onDelete, editPath }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>Ação</th>
            <th>Ação</th>
            {columns.map(col => (
              <th key={col}>{columnAliases[col] || col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>
                <Link to={`${editPath}/${item.id}`}>
                  <Button title="Editar" color="success" />
                </Link>
              </td>
              <td>
                <Button
                  title="Excluir"
                  color="danger"
                  onClick={() => onDelete(item.name, item.id)}
                />
              </td>
              {columns.map(col => (
                <td key={col}>{item[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
