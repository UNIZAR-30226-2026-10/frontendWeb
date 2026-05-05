const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface LoginResponse {
  email: string;
  username: string;
}

export interface MensajeResponse {
  message?: string;
  error?: string;
}

export const CuentaService = {
  
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || 'Correo o contraseña incorrectos');
    
    return data as LoginResponse;
  },

  register: async (email: string, username: string, password: string): Promise<MensajeResponse> => {
    const response = await fetch(`${API_URL}/auth/new_users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, username, password }),
    });
    
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text); 
    } catch (e) {
      data = { message: text }; 
    }
    
    if (!response.ok) throw new Error(data.error || data.message || 'Error al crear la cuenta');
    
    return data as MensajeResponse;
  },

  cookieLogin: async (): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/cookie_login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({}), 
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Sesión no válida');

    return data as LoginResponse;
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error('Error al cerrar sesión en el servidor');
    }
  },
};