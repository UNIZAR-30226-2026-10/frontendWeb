// src/services/auth.service.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Si tu backend devuelve algún dato al loguearse (como un token o el perfil),
// lo ideal es crear una interfaz. Por ahora ponemos una genérica.
export interface CuentaResponse {
  message?: string;
  // token?: string; 
}

export const CuentaService = {
  
  login: async (email: string, password: string): Promise<CuentaResponse> => {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ¡Recuerda las cookies!
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || 'Correo o contraseña incorrectos');
    
    return data as CuentaResponse;
  },

  register: async (email: string, username: string, password: string): Promise<CuentaResponse> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.message || 'Error al crear la cuenta');
    
    return data as CuentaResponse;
  }
};