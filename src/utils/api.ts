export type RequestType = {
  method: string;
  path: string;
};

const api = {
  categories: {
    list: (): RequestType => ({ method: 'get', path: 'categories' }),
  },
  jokes: {
    get: (category: string): RequestType => ({
      method: 'get',
      path: `random?category=${category}`,
    }),
    search: (query: string): RequestType => ({
      method: 'get',
      path: `search?query=${query}`,
    }),
  },
};

export default api;
