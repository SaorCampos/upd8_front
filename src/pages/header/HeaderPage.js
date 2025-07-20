import React from 'react';
import { useHeader } from '../../hooks/header/HeaderHook';
import Header from '../../components/Header';

function HeaderPage({ onSearch }) {
  const { 
    searchParams, 
    cities, 
    handleChange, 
    handleSubmit, 
    handleClear, 
    StateEnum 
  } = useHeader(onSearch);

  return (
    <div className="container">
      <div className="card mt-3 border border-dark">
        <div className="card-body">
          <h6 className="text-left mt-3">Consulta Cliente</h6>
          <Header
            searchParams={searchParams}
            cities={cities}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            StateEnum={StateEnum}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderPage;