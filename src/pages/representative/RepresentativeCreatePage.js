import React, { useState } from "react";
import FormRepresentative from "../../components/representative/FormRepresentative";
import useCreateRepresentative from "../../hooks/representative/RepresentativeCreate";

function CreateRepresentative() {
  const {
    cities,
    clientsOptions,
    formData,
    errors,
    handleChange,
    handleClientsChange,
    handleSubmit,
    handleClear
  } = useCreateRepresentative();

  const [formValid, setFormValid] = useState(false);
  const isEdit = false;

  const validateForm = () => {
    let isValid = true;
    Object.values(errors).forEach(error => {
      if (error) isValid = false;
    });
    setFormValid(isValid);
    return isValid;
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      handleSubmit(event);
    } else {
      event.target.classList.add("was-validated");
    }
  };

  return (
    <div className="container">
      <div className="card mt-3 border border-dark">
        <div className="card-body">
          <h6 className="text-left mt-3">Cadastro Representante</h6>

          <FormRepresentative
            formData={formData}
            errors={errors}
            cities={cities}
            clientsOptions={clientsOptions}
            handleChange={handleChange}
            handleClientsChange={handleClientsChange}
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

export default CreateRepresentative;
