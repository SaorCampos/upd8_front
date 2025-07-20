import { useState, useEffect } from "react";
import ClientService from "../../services/ClientService";
import CityService from "../../services/CityService";

function useClient() {
  // lista de dados
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // filtros controlados pelo formulário
  const [searchParams, setSearchParams] = useState({
    cpf: "",
    name: "",
    date_birth: "",
    sex: "",
    state: "",
    city: "",
  });

  const [cities, setCities] = useState([]);

  const fetchClients = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const { pagination, list } = await ClientService.getClients(
        page,
        filters
      );
      setClients(list);
      setCurrentPage(pagination.page);
      setTotalPages(Math.ceil(pagination.total / pagination.perPage));
    } catch (err) {
      console.error("Erro ao buscar clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(currentPage, searchParams);
  }, [currentPage, searchParams]);

  useEffect(() => {
    const uf = searchParams.state;
    if (!uf) return setCities([]);
    CityService.getCitiesIntegration(uf)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setCities(data.map((d) => d.nome)))
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, [searchParams.state]);

  // chamado pelo FilterForm quando clica “Pesquisar”
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // limpa os filtros
  const handleClear = () => {
    setSearchParams({
      cpf: "",
      name: "",
      date_birth: "",
      sex: "",
      state: "",
      city: "",
    });
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirma exclusão deste cliente?")) return;
    try {
      await ClientService.deleteClient(id);
      fetchClients(currentPage, searchParams);
    } catch (err) {
      console.error("Erro ao excluir client:", err);
      alert("Não foi possível excluir o cliente.");
    }
  };

  return {
    // dados de listagem
    clients,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,

    // filtros e controle do FilterForm
    searchParams,
    cities,
    handleChange,
    handleSubmit,
    handleClear,
  };
}

export default useClient;
