import React from 'react';
import useClient from '../../hooks/client/Client';
import Header from '../../components/shared/Header';
import Table from '../../components/shared/Table';
import Pagination from '../../components/shared/Pagination';
import Loading from '../../components/shared/Loading';

function Client() {
  const { clients, loading, currentPage, totalPages, handleSearch, handleDelete, setCurrentPage } = useClient();

  const columns = ["name", "cpf", 'dateBirth', "state", "cityName", "sex", "address"];
  const columnAliases = {
    name: "Cliente",
    cpf: "CPF",
    dateBirth: "Data de Nascimento",
    state: "Estado",
    cityName: "Cidade",
    sex: "Sexo",
    address: "Endereço",
  };

  const tableData = clients.map(client => ({
    id: client.id,
    name: client.name,
    cpf: client.cpf,
    sex: client.sex,
    dateBirth: client.dateBirth,
    address: client.address,
    cityName: client.city,
    state: client.state
  }));

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container">
        <div className="card mt-3 border border-dark">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <>
                <Table
                  columns={columns}
                  data={tableData}
                  columnAliases={columnAliases}
                  onDelete={handleDelete}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;