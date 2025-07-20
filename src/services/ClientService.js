import ClientRepository from '../repositories/ClientRepository';
import generateQueryString from '../support/queryParams/QueryParams';

const ClientService = {
  getClients: async (page = 1, filters = {}) => {
    const queryParams = generateQueryString(page, 10, filters);
    try {
      const response = await ClientRepository.getClients(queryParams);
      return response.data.data;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return { list: [], total: 0 };
    }
  },

  getClient: async (id) => {
    try {
      const response = await ClientRepository.getClient(id);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return { list: []};
    }
  },

  postClient: async (body) => {
    try {
      const response = await ClientRepository.postClient(body);
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return error;
    }
  },

  putClient: async (body) => {
    try {
      const response = await ClientRepository.putClient(body);
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return error;
    }
  },

  deleteClient: async (id) => {
    try {
      const response = await ClientRepository.deleteClient(id);
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return 400;
    }
  }
};

export default ClientService;