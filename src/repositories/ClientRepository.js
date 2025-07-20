import api from '../config/api';

const ClientRepository = {
  getClients: async (queryParams) => {
    return await api.get(`clients?${queryParams}`);
  },

  getClient: async (id) => {
    return await api.get(`clients/${id}`);
  },

  postClient: async (body) => {
    return await api.post(`clients/create`, body);
  },

  putClient: async (body) => {
    return await api.put(`clients/update`, body);
  },

  deleteClient: async (id) => {
    return await api.delete(`clients/delete/${id}`);
  }
};

export default ClientRepository;