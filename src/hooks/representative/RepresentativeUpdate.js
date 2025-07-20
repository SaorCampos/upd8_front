import { useState, useEffect } from "react";
import CityService from "../../services/CityService";
import RepresentativeService from "../../services/RepresentativeService";
import ClientService from "../../services/ClientService";
import FormatCNPJ from "../../support/formatField/FormatCNPJ";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function useUpdateRepresentative() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    if (!formData.state) return setCities([]);
    CityService.getCitiesIntegration(formData.state)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setCities(data.map((d) => d.nome)))
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, [formData.state]);

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
    if (id) fetchRepresentative(id);
  }, [id]);

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
    try {
      const response = await RepresentativeService.putRepresentative(formData);
      if (response.status === 200) {
        alert("Edição realizada com sucesso!");
        navigate("/representante");
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
    fetchRepresentative,
    fetchCities,
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

export default useUpdateRepresentative;
