// src/hooks/useAuth.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginService } from '../services/login.service';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Llamamos a nuestro servicio pasándole los estados actuales
      await loginService(email, password);
      
      // Si el servicio no lanza errores, redirigimos
      router.push('/juego');
      
    } catch (err: any) {
      // Atrapamos el error que lanzó el servicio y lo guardamos en el estado
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  // Devolvemos todo lo que el componente visual va a necesitar
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin
  };
};