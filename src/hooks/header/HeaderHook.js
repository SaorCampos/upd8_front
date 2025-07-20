import { useState, useEffect } from 'react';
import CityService from '../../services/CityService';
import FormatCPF from '../../support/formatField/FormatCPF';

function HeaderHook(onSearch) {
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useState({
    cpf: '',
    name: '',
    date_birth: '',
    sex: '',
    state: '',
    city: ''
  });

  const fetchCities = async () => {
    try {
      const response = await CityService.getCities();
      if (response.status === 200) {
        setCities(response.data.data);
      } else {
        console.error('Falha ao obter dados:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  useEffect(() => {
    fetchCities();
    console.log('cities updated: ', cities);
  }, [cities]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setSearchParams((prevData) => ({
          ...prevData,
          [name]: FormatCPF(value),
      }));

    } else {
      setSearchParams((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      cpf: '',
      date_birth: '',
      sex: '',
      state: '',
      city: ''
    });
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