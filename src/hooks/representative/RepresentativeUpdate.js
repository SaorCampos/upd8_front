import { useState, useEffect } from "react";
import CityService from "../../services/CityService";
import RepresentativeService from "../../services/RepresentativeService";
import ClientService from "../../services/ClientService";
import FormatCNPJ from "../../support/formatField/FormatCNPJ";

function UpdateRepresentative({ id }) {
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [clientsOptions, setClientsOptions] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    cnpj: "",
    name: "",
    state: "",
    city_name: "",
    address: "",
    clients: [],
  });

  // 1) busca o representante
  const fetchRepresentative = async (id) => {
    try {
      const response = await RepresentativeService.getRepresentative(id);
      if (response.statusCode === 200) {
        const data = response.data;
        setFormData({
          id: data.id,
          cnpj: data.cnpj,
          name: data.name || "",
          state: data.state || "",
          city_name: data.city || "",
          address: data.address || "",
          clients: data.clients || [],
        });
      }
    } catch (error) {
      console.error("Erro ao buscar representante:", error);
    }
  };

  // 2) busca cidades quando mudar o estado
  useEffect(() => {
    if (!formData.state) return setCities([]);
    CityService.getCitiesIntegration(formData.state)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => setCities(data.map(d => d.nome)))
      .catch(err => console.error("Erro ao buscar cidades:", err));
  }, [formData.state]);

  // 3) busca todos os clients **sem** paginação (ou perPage super alto)
  useEffect(() => {
    const loadClients = async () => {
      try {
        const { list } = await ClientService.getClients(1, {});  
        setClientsOptions(list);
      } catch (err) {
        console.error("Erro ao buscar clients:", err);
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    if (id) fetchRepresentative(id);
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "cnpj" ? FormatCNPJ(value) : value
    }));
  };

  const handleClientsChange = e => {
    const selected = Array.from(e.target.selectedOptions)
      .map(opt => parseInt(opt.value, 10))
      .filter(n => !isNaN(n));
    setFormData(prev => ({ ...prev, clients: selected }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await RepresentativeService.putRepresentative(formData);
      if (response.status === 200) {
        alert("Edição realizada com sucesso!");
        handleClear();
        setErrors({});
      } else {
        const dataErros = response.response.data.data;
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
      id: 0,
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

export default UpdateRepresentative;
