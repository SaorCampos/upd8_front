import RepresentativeRepository from "../repositories/RepresentativeRepository";
import generateQueryString from "../support/queryParams/QueryParams";

const RepresentativeService = {
    getRepresentatives: async (page = 1, filters = {}) => {
    const queryParams = generateQueryString(page, 10, filters);
    try {
      const response = await RepresentativeRepository.getRepresentatives(queryParams);
      return response.data.data;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return { list: [], total: 0 };
    }
  },
  getRepresentative: async (id) => {
    try {
      const response = await RepresentativeRepository.getRepresentative(id);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return error;
    }
  },
  getRepresentativesByClientId: async (clientId) => {
    try {
      const response = await RepresentativeRepository.getRepresentativesByClientId(clientId);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return error;
    }
  },
  postRepresentative: async (body) => {
  try {
    const response = await RepresentativeRepository.postRepresentative(body);
    return response;
  } catch (error) {
    console.error("Erro ao fazer requisição", error.message);
    return error;
  }
}
  ,
  putRepresentative: async (body) => {
    try {
      const response = await RepresentativeRepository.putRepresentative(body);
      return response;
    } catch (error) {
      console.error("Erro ao fazer requisição", error.message);
      return error;
    }
  }
}

export default RepresentativeService;