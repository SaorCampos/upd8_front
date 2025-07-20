import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormRepresentative from "../../components/representative/FormRepresentative";
import useUpdateRepresentative from "../../hooks/representative/RepresentativeUpdate";

function UpdateRepresentative() {
  const { id } = useParams();
  const {
    cities,
    clientsOptions,
    formData,
    errors,
    handleChange,
    handleClientsChange,
    handleSubmit,
    handleClear,
    fetchRepresentative,
    fetchCities,
  } = useUpdateRepresentative();

  const [formValid, setFormValid] = useState(false);
  const isEdit = true;

  useEffect(() => {
    if (id) {
      fetchRepresentative(id);
    }
  }, [id]);

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
    } else {
      // opcional: limpa lista se o usuário apagar o estado
      // setCities([]);  // mas o hook já faz isso
    }
  }, [formData.state]);

  const validateForm = () => {
    let isValid = true;
    Object.values(errors).forEach((error) => {
      if (error) isValid = false;
    });
    setFormValid(isValid);
    return isValid;
  };

  const handleFormSubmit = (event) => {
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
          <h6 className="text-left mt-3">Atualizar Representante</h6>

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
export default UpdateRepresentative;
