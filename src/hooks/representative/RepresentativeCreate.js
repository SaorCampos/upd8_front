import { useState, useEffect } from "react";
import CityService from "../../services/CityService";
import RepresentativeService from "../../services/RepresentativeService";
import ClientService from "../../services/ClientService";
import FormatCNPJ from "../../support/formatField/FormatCNPJ";
import { useNavigate } from "react-router-dom";

function CreateRepresentative() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [clientsOptions, setClientsOptions] = useState([]);
  const [formData, setFormData] = useState({
    cnpj: "",
    name: "",
    state: "",
    city_name: "",
    address: "",
    clients: [],
  });

  useEffect(() => {
    const loadClients = async () => {
      try {
        const { list } = await ClientService.getClients(1, { perPage: 100 });
        setClientsOptions(list);
      } catch (err) {
        console.error("Erro ao buscar clients:", err);
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    if (!formData.state) {
      setCities([]);
      return;
    }
    CityService.getCitiesIntegration(formData.state)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setCities(data.map((d) => d.nome)))
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cnpj" ? FormatCNPJ(value) : value,
    }));
  };

  const handleClientsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions)
      .map((opt) => parseInt(opt.value, 10))
      .filter((n) => !isNaN(n));
    setFormData((prev) => ({ ...prev, clients: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 CreateRepresentative.handleSubmit disparou");
    try {
      const response = await RepresentativeService.postRepresentative(formData);
      console.log("REP RESPONSE ➞", response);
      if (response.status === 201 || response.statusCode === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/representante");
        handleClear();
        setErrors({});
      } else {
        const errData = response.data || response || {};
        console.error("Erro ao criar representante:", errData);
        setErrors(errData.errors || {});
        alert(errData.message || "Erro ao criar representante.");
      }
    } catch (err) {
      console.error("Erro no submit:", err);
      alert("Ocorreu um erro ao enviar o formulário!");
    }
  };

  const handleClear = () => {
    setFormData({
      cnpj: "",
      name: "",
      state: "",
      city_name: "",
      address: "",
      clients: [],
    });
    setCities([]);
    setErrors({});
  };

  return {
    cities,
    clientsOptions,
    formData,
    errors,
    handleChange,
    handleClientsChange,
    handleSubmit,
    handleClear,
  };
}

export default CreateRepresentative;
