import { useState, useEffect } from "react";
import ClientService from "../../services/ClientService";

function Client() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cpf: "",
    name: "",
    date_birth: "",
    sex: "",
    state: "",
    city: "",
  });

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
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(currentPage, filters);
  }, [currentPage, filters]);

  const handleSearch = (searchParams) => {
    setFilters(searchParams);
    setCurrentPage(1);
  };

  const handleDelete = async (name, id) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o cliente: ${name}?`
    );
    if (confirmDelete) {
      try {
        const response = await ClientService.deleteClient(id);
        if (response.status === 200) {
          setClients(clients.filter((client) => client.id !== id));
          alert(`Cliente: ${name} excluído com sucesso.`);
        } else {
          alert("Erro ao excluir o cliente.");
        }
      } catch (error) {
        console.error("Erro ao excluir o cliente", error);
        alert("Ocorreu um erro ao excluir o cliente.");
      }
    }
  };

  return {
    clients,
    loading,
    currentPage,
    totalPages,
    handleSearch,
    handleDelete,
    setCurrentPage,
    fetchClients,
  };
}

export default Client;
