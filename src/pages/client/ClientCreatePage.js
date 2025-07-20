import React, { useState } from 'react';
import FormClient from '../../components/client/FormClient';
import useClientCreate from '../../hooks/client/ClienteCreate';

function ClientCreate() {
  const { cities, formData, errors, handleChange, handleSubmit, handleClear } = useClientCreate();
  const [formValid, setFormValid] = useState(false);
  const isEdit = false;

  const validateForm = () => {
    let isValid = true;
    Object.values(errors).forEach(error => {
      if (error) {
        isValid = false;
      }
    });
    setFormValid(isValid);
    return isValid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit(event);
    } else {
      event.target.classList.add('was-validated');
    }
  };

  return (
    <div className="container">
      <div className="card mt-3 border border-dark">
        <div className="card-body">
          <h6 className="text-left mt-3">Cadastro Cliente</h6>

          <FormClient
            formData={formData}
            errors={errors}
            cities={cities}
            handleChange={handleChange}
            handleSubmit={handleFormSubmit}
            handleClear={handleClear}
            formValid={formValid}
            isEdit={isEdit}
          />

        </div>
      </div>
    </div>
  );
}

export default ClientCreate;