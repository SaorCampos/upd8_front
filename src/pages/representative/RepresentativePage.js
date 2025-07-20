import React from 'react';
import useRepresentative from '../../hooks/representative/Representative';
import FilterForm        from '../../components/shared/FilterForm';
import Table             from '../../components/shared/Table';
import Pagination        from '../../components/shared/Pagination';
import Loading           from '../../components/shared/Loading';
import StateEnum         from '../../support/enums/StateEnum';

export default function RepresentativePage() {
  const {
    representatives, loading, currentPage, totalPages, setCurrentPage, handleDelete,
    // filtros
    searchParams, cities, clientsOptions, handleChange, handleSubmit, handleClear
  } = useRepresentative();

  const fields = [
    { type:'select', name:'clientId', label:'Cliente',
      options: clientsOptions.map(c => ({ value:c.id, label:c.name })),
      emptyLabel: 'Todos'
    },
    { type:'text',   name:'cnpj',  label:'CNPJ', placeholder:'00.000.000/0000-00', maxLength:18 },
    { type:'text',   name:'name',  label:'Nome' },
    { type:'select', name:'state', label:'Estado',
      options: Object.values(StateEnum).map(uf=>({value:uf,label:uf}))
    },
    { type:'select', name:'city',  label:'Cidade',
      options: cities.map(c=>({value:c,label:c})),
      emptyLabel: 'Todas'
    },
  ];

  const columns = ["name","state","cityName","cnpj","address"];
  const columnAliases = {
    name:"Representante", state:"Estado",
    cityName:"Cidade", cnpj:"CNPJ", address:"Endereço"
  };
  const tableData = representatives.map(r => ({
    id: r.id, name: r.name, state: r.state,
    cityName: r.city, cnpj: r.cnpj, address: r.address
  }));

  return (
    <>
      <FilterForm
        fields={fields}
        values={searchParams}
        errors={{}}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />

      <div className="container">
        <div className="card mt-3 border border-dark">
          <div className="card-body">
            {loading
              ? <Loading />
              : <>
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
            }
          </div>
        </div>
      </div>
    </>
  );
}