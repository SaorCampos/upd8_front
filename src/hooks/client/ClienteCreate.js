import { useState, useEffect } from "react";
import CityService from "../../services/CityService";
import ClientService from "../../services/ClientService";
import FormatCPF from "../../support/formatField/FormatCPF";
import { useNavigate } from "react-router-dom";

function ClientCreate() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    cpf: "",
    name: "",
    date_birth: "",
    sex: "",
    state: "",
    city: "",
    address: "",
  });

  const fetchCities = async (state) => {
    if (!state) return;
    try {
      const response = await CityService.getCitiesIntegration(state);
      if (response.ok) {
        const data = await response.json();
        const citiesList = data.map((district) => district.nome);
        setCities(citiesList);
      } else {
        console.error("Falha ao obter dados:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: FormatCPF(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ClientService.postClient(formData);
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/cliente");
        handleClear();
        setErrors({});
      } else {
        console.log(response);
        const dataErros = response.data;
        setErrors(dataErros || {});
        alert(response.response.message || "Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados", error);
      alert("Ocorreu um erro ao enviar o formulário!");
    }
  };

  const handleClear = () => {
    setFormData({
      cpf: "",
      name: "",
      date_birth: "",
      sex: "",
      state: "",
      city: "",
      address: "",
    });
    setCities([]);
    setErrors({});
  };

  return {
    cities,
    formData,
    handleChange,
    handleSubmit,
    handleClear,
    errors,
  };
}

export default ClientCreate;
