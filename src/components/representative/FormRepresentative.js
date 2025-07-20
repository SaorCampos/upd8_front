import React from "react";
import Button from "../shared/Button";
import StateEnum from "../../support/enums/StateEnum";

function FormRepresentative({
  formData,
  errors,
  cities,
  clientsOptions,
  handleChange,
  handleClientsChange,
  handleSubmit,
  handleClear,
  formValid,
}) {
  return (
    <form
      className="g-3 align-items-center mt-3 needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="row">
        <div className="col-auto">
          <label htmlFor="cnpj" className="col-form-label">
            CNPJ
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            className={`form-control ${errors.cnpj ? "is-invalid" : ""}`}
            value={formData.cnpj || ""}
            placeholder="12.345.678/0001-00"
            maxLength="18"
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errors.cpf ? errors.cpf : "Campo obrigatório"}
          </div>
        </div>

        <div className="col-auto">
          <label htmlFor="name" className="col-form-label">
            Nome
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errors.name ? errors.name : "Campo obrigatório"}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-auto">
          <label htmlFor="state" className="col-form-label">
            Estado
          </label>
        </div>
        <div className="col-auto">
          <select
            className={`form-select ${errors.state ? "is-invalid" : ""}`}
            name="state"
            id="state"
            value={formData.state || ""}
            onChange={handleChange}
            required
          >
            <option value="">Todos</option>
            {Object.keys(StateEnum).map((key) => (
              <option key={key} value={StateEnum[key]}>
                {StateEnum[key]}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {errors.state ? errors.state : "Selecione um estado"}
          </div>
        </div>

        <div className="col-auto">
          <label htmlFor="city_name" className="col-form-label">
            Cidade
          </label>
        </div>
        <div className="col-auto">
          <select
            className={`form-select ${errors.city_name ? "is-invalid" : ""}`}
            name="city_name"
            id="city_name"
            value={formData.city_name || ""}
            onChange={handleChange}
            required
          >
            <option value="">Todos</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {errors.city_name ? errors.city_name : "Selecione uma cidade"}
          </div>
        </div>

        <div className="col-auto">
          <label htmlFor="address" className="col-form-label">
            Endereço
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            id="address"
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address || ""}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errors.address ? errors.address : "Campo obrigatório"}
          </div>
        </div>

        <div className="col-auto">
          <label htmlFor="clients" className="col-form-label">
            Clientes
          </label>
        </div>
        <div className="col-auto">
          <select
            id="clients"
            name="clients"
            multiple
            className={`form-select ${errors.clients ? "is-invalid" : ""}`}
            value={formData.clients.map(String)}
            onChange={handleClientsChange}
            required
          >
            {clientsOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {errors.clients ? errors.clients : "Selecione ao menos um cliente"}
          </div>
        </div>
        
      </div>

      <div className="d-flex justify-content-end">
        <Button
          title="Enviar"
          color="primary"
          type="submit"
          disabled={!formValid}
        />
        &nbsp;&nbsp;&nbsp;
        <Button title="Limpar" color="secondary" onClick={handleClear} />
      </div>
    </form>
  );
}
export default FormRepresentative;
