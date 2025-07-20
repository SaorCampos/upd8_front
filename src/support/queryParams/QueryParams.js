const generateQueryString = (page = 1, perPage = 10, filters = {}) => {
  const params = { page, perPage };
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params[key] = value;
  });
  return new URLSearchParams(params).toString();
};

export default generateQueryString;