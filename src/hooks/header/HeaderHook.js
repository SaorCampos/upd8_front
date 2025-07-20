import { useState, useEffect } from "react";
import CityService from "../../services/CityService";
import FormatCPF from "../../support/formatField/FormatCPF";

function HeaderHook(onSearch) {
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useState({
    cpf: "",
    name: "",
    date_birth: "",
    sex: "",
    state: "",
    city: "",
  });

  // busca só quando mudar 'state'
  useEffect(() => {
    const load = async () => {
      const uf = searchParams.state;
      if (!uf) {
        setCities([]);      // limpa lista se tirar o estado
        return;
      }
      try {
        const res = await CityService.getCitiesIntegration(uf);
        if (res.ok) {
          const data = await res.json();
          setCities(data.map(d => d.nome));
        } else {
          console.error("Falha ao obter cidades:", res.status);
        }
      } catch (err) {
        console.error("Erro ao buscar cidades:", err);
      }
    };
    load();
  }, [searchParams.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: name === "cpf" ? FormatCPF(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    const empty = { cpf:"", name:"", date_birth:"", sex:"", state:"", city:"" };
    setSearchParams(empty);
    onSearch({});
  };

  return {
    searchParams,
    cities,
    handleChange,
    handleSubmit,
    handleClear,
  };
}

export default HeaderHook;