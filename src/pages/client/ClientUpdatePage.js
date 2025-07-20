import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormClient from '../../components/client/FormClient';
import useClientUpdate from '../../hooks/client/ClientUpdate';

function ClientUpdate() {
  const { id } = useParams();
  const { cities, formData, errors, handleChange, handleSubmit, handleClear, fetchClient, fetchCities } = useClientUpdate();
  const [formValid, setFormValid] = useState(false);
  const isEdit = true;

  useEffect(() => {
    if (id) {
      fetchClient(id);
      fetchCities(formData.state);
    }
  }, [id, fetchClient, fetchCities]);

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
          <h6 className="text-left mt-3">Edição Cliente</h6>

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

export default ClientUpdate;