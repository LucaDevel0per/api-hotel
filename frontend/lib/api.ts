const API_URL = 'http://localhost:3001';

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response.json();
};

export const api = {
  guests: {
    getAll: () => fetchApi('/guests'),
    getById: (id: number) => fetchApi(`/guests/${id}`),
    create: (data: any) => fetchApi('/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => fetchApi(`/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    delete: (id: number) => fetchApi(`/guests/${id}`, {
      method: 'DELETE',
    }),
  },
  rooms: {
    getAll: () => fetchApi('/rooms'),
    getById: (id: number) => fetchApi(`/rooms/${id}`),
    create: (data: any) => fetchApi('/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => fetchApi(`/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    delete: (id: number) => fetchApi(`/rooms/${id}`, {
      method: 'DELETE',
    }),
  },
  bookings: {
    getAll: () => fetchApi('/bookings'),
    getById: (id: number) => fetchApi(`/bookings/${id}`),
    create: (data: any) => fetchApi('/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => fetchApi(`/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
    delete: (id: number) => fetchApi(`/bookings/${id}`, {
      method: 'DELETE',
    }),
  },
}; 