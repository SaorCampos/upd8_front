import api from '../config/api';

const CityRepository = {
  getCitiesIntegration: async (state) => {
    return await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`);
  },

  getCities: async () => {
    return await api.get(`cities`);
  }
};

export default CityRepository;
