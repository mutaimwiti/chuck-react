export type RequestType = {
    method: string,
    path: string,
};

const api = {
    categories: {
        list: (): RequestType => ({method: 'get', path: 'categories'}),
    },
    jokes: {
        get: (category: string): RequestType => ({method: 'get', path: `random?category=${category}`}),
    }
}

export default api;
