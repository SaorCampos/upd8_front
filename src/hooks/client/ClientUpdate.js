import { useState } from 'react';
import CityService from '../../services/CityService';
import ClientService from '../../services/ClientService';

const ClientUpdate = () => {
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    client_id: 0,
    city_id: 0,
    address: '',
    state: '',
    city_name: '',
  });

  const fetchClient = async (id) => {
    try {
      const response = await ClientService.getClient(id);
      if (response.status === 200) {
        const data = response.data[0];
        setFormData({
            client_id: data.id,
            cpf: data.cpf,
            name: data.name || '',
            date_birth: data.dateBirth || '',
            sex: data.sex || '',
            address: data.address || '',
            state: data.city.state || '',
            city_name: data.city.cityName || '',
            city_id: data.city.id,
        });
      } else {
        console.error('Erro ao buscar os dados do cliente');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do cliente:', error);
    }
  };

  const fetchCities = async (state) => {
    if (!state) return;

    try {
        const response = await CityService.getCitiesIntegration(state);
        if (response.ok) {
            const data = await response.json();
            const citiesList = data.map(district => district.nome);
            setCities(citiesList);
        } else {
            console.error('Falha ao obter dados:', response.status);
        }
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      client_id: formData.client_id,
      city_id: formData.city_id,
      address: formData.address,
      state: formData.state,
      city_name: formData.city_name,
    };

    try {
      const response = await ClientService.putClient(body);
      console.log(response);
      if (response.status === 200) {
          alert('Edição realizada com sucesso!');
          handleClear();
          setErrors({});
      } else {
          const dataErros = response.response.data.data;
          setErrors(dataErros || {});
          alert(response.response.message || 'Erro ao enviar os dados.');
      }
    } catch (error) {
        console.error("Erro ao enviar os dados", error);
        alert('Ocorreu um erro ao enviar o formulário!');
    }
  };

  const handleClear = () => {
    setFormData({
      state: '',
      city_name: '',
      address: '',
    });
    setErrors({});
  };

  return {
    cities,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleClear,
    fetchClient,
    fetchCities,
  };
};

export default ClientUpdate;