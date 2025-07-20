import { useState, useEffect } from "react";
import RepresentativeService from "../../services/RepresentativeService";
import CityService from "../../services/CityService";
import ClientService from "../../services/ClientService"; // <- importar

function useRepresentative() {
  // listagem
  const [representatives, setRepresentatives] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // filtros
  const [searchParams, setSearchParams] = useState({
    cnpj: "",
    name: "",
    state: "",
    city: "",
    clientId: "",
  });

  // opções de selects
  const [cities, setCities] = useState([]);
  const [clientsOptions, setClientsOptions] = useState([]);
  // load de clientes pra dropdown
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

  // busca representantes (ou por clientId, ou geral)
  const fetchRepresentatives = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      let list, pagination;

      if (filters.clientId) {
        const res = await RepresentativeService.getRepresentativesByClientId(
          filters.clientId
        );
        list = res.data;
        pagination = { page: 1, perPage: list.length, total: list.length };
      } else {
        const { pagination: pg, list: ls } =
          await RepresentativeService.getRepresentatives(page, filters);
        list = ls;
        pagination = pg;
      }
      setRepresentatives(list);
      setCurrentPage(pagination.page);
      setTotalPages(Math.ceil(pagination.total / pagination.perPage));
    } catch (err) {
      console.error("Erro ao buscar representantes:", err);
    } finally {
      setLoading(false);
    }
  };

  // dispara quando mudam page ou filtros
  useEffect(() => {
    fetchRepresentatives(currentPage, searchParams);
  }, [currentPage, searchParams]);

  // cidades
  useEffect(() => {
    const uf = searchParams.state;
    if (!uf) return setCities([]);
    CityService.getCitiesIntegration(uf)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setCities(data.map((d) => d.nome)))
      .catch((err) => console.error("Erro ao buscar cidades:", err));
  }, [searchParams.state]);

  // handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchParams({ cnpj: "", name: "", state: "", city: "", clientId: "" });
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirma exclusão deste representante?")) return;
    try {
      await RepresentativeService.deleteRepresentative(id);
      fetchRepresentatives(currentPage, searchParams);
    } catch {
      alert("Erro ao excluir");
    }
  };

  return {
    representatives,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,

    // filtros
    searchParams,
    cities,
    clientsOptions,
    handleChange,
    handleSubmit,
    handleClear,
  };
}

export default useRepresentative;
