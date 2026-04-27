// src/services/auth.service.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface CuentaResponse {
  message?: string;
}

export const CuentaService = {
  
  login: async (email: string, password: string): Promise<CuentaResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || 'Correo o contraseña incorrectos');
    
    return data as CuentaResponse;
  },

  register: async (email: string, username: string, password: string): Promise<CuentaResponse> => {
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
    
    return data as CuentaResponse;
  },

  cookieLogin: async (): Promise<{ email: string; username: string }> => {
    const response = await fetch(`${API_URL}/auth/cookie_login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // CRUCIAL: Envía las cookies al servidor
      body: JSON.stringify({}), // No es necesario enviar datos, pero el servidor espera un cuerpo JSON
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Sesión no válida');

    return data;
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Para que el servidor sepa qué sesión cerrar
    });

    if (!response.ok) {
      throw new Error('Error al cerrar sesión en el servidor');
    }
  },
};