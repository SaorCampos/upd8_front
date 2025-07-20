import CityRepository from '../repositories/CityRepository';

const CityService = {
  getCitiesIntegration: async (state) => {
    try {
      const response = await CityRepository.getCitiesIntegration(state);
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return [];
    }
  },

  getCities: async () => {
    try {
      const response = await CityRepository.getCities();
      console.log(response)
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return [];
    }
  }
};

export default CityService;