import React from 'react';
import Button from './Button';
import HeaderHook from '../../hooks/header/HeaderHook';
import StateEnum from '../../support/enums/StateEnum';

function Header({ onSearch }) {
  const {
    searchParams,
    cities,
    handleChange,
    handleSubmit,
    handleClear
  } = HeaderHook(onSearch);

  return (
    <div className="container">
      <div className="card mt-3 border border-dark">
        <div className="card-body">
          <h6 className="text-left mt-3">Consulta Cliente</h6>
          <form className="g-3 align-items-center mt-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-auto">
                <label htmlFor="cpf" className="col-form-label">CPF</label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  className="form-control"
                  value={searchParams.cpf}
                  onChange={handleChange}
                  placeholder="378.846.758-55"
                  maxLength="14"
                />
              </div>

              <div className="col-auto">
                <label htmlFor="name" className="col-form-label">Nome</label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={searchParams.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-auto">
                <label htmlFor="date" className="col-form-label">Data de Nascimento</label>
              </div>
              <div className="col-auto">
                <input
                  type="date"
                  id="date"
                  name="date_birth"
                  className="form-control"
                  value={searchParams.date_birth}
                  onChange={handleChange}
                />
              </div>

              <div className="col-auto d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    value="M"
                    id="M"
                    checked={searchParams.sex === 'M'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="M">Masculino</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    value="F"
                    id="F"
                    checked={searchParams.sex === 'F'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="F">Feminino</label>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-auto">
                <label htmlFor="state" className="col-form-label">Estado</label>
              </div>
              <div className="col-auto">
                <select
                  className="form-select"
                  name="state"
                  id="state"
                  value={searchParams.state}
                  onChange={handleChange}
                >
                  <option value="">Todos</option>
                  {Object.keys(StateEnum).map((key) => (
                    <option key={key} value={StateEnum[key]}>
                      {StateEnum[key]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-auto">
                <label htmlFor="city" className="col-form-label">Cidade</label>
              </div>
              <div className="col-auto">
                <select
                  className="form-select"
                  name="city"
                  id="city"
                  value={searchParams.city}
                  onChange={handleChange}
                >
                  <option value="">Todas</option>
                  {cities && cities.length > 0 ? (
                    cities.map((city, index) => (
                      <option key={index} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Carregando cidades...</option>
                  )}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Button
                title="Pesquisar"
                color="primary"
                type="submit"
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                title="Limpar"
                color="secondary"
                onClick={handleClear}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;