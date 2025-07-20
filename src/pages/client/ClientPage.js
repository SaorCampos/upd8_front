import React from 'react';
import useClient     from '../../hooks/client/Client';
import FilterForm    from '../../components/shared/FilterForm';
import Table         from '../../components/shared/Table';
import Pagination    from '../../components/shared/Pagination';
import Loading       from '../../components/shared/Loading';
import StateEnum     from '../../support/enums/StateEnum';

export default function ClientPage() {
  const {
    clients, loading, currentPage, totalPages, setCurrentPage, handleDelete,
    // filtros
    searchParams, cities, handleChange, handleSubmit, handleClear
  } = useClient();

  const fields = [
    { type:'text', name:'cpf', label:'CPF', placeholder:'000.000.000-00', maxLength:14 },
    { type:'text', name:'name', label:'Nome' },
    { type:'date', name:'date_birth',label:'Data de Nascimento' },
    { type:'radio-group', name:'sex', options:[
        { value:'M', label:'Masculino' },
        { value:'F', label:'Feminino' }
      ]
    },
    { type:'select', name:'state',  label:'Estado',
      options: Object.values(StateEnum).map(uf=>({value:uf,label:uf}))
    },
    { type:'select', name:'city',   label:'Cidade',
      options: cities.map(c=>({value:c,label:c})),
      emptyLabel: 'Todas'
    },
  ];

  const columns = ["name","cpf","dateBirth","state","cityName","sex","address"];
  const columnAliases = {
    name:"Cliente", cpf:"CPF", dateBirth:"Data de Nascimento",
    state:"Estado", cityName:"Cidade", sex:"Sexo", address:"Endereço"
  };
  const tableData = clients.map(c=>({
    id:c.id, name:c.name, cpf:c.cpf, sex:c.sex,
    dateBirth:c.dateBirth, address:c.address,
    cityName:c.city, state:c.state
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
                    editPath="/cliente/alterar"
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </>}
          </div>
        </div>
      </div>
    </>
  );
}
