import api from "../config/api";

const RepresentativeRepository = {
  getRepresentatives: async (queryParams) => {
    return await api.get(`representatives?${queryParams}`);
  },
  getRepresentative: async (id) => {
    return await api.get(`representatives/${id}`);
  },
  getRepresentativesByClientId: async (id) => {
    return await api.get(`representatives/client/${id}`);
  },
  postRepresentative: async (body) => {
    return await api.post(`representatives/create`, body);
  },
  putRepresentative: async (body) => {
    return await api.put(`representatives/update`, body);
  },
};

export default RepresentativeRepository;
