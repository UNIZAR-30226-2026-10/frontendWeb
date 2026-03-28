// src/hooks/useAuth.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CuentaService } from '@/services/cuentas.service'; 

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
      // 2. Usamos el método dentro del objeto
      await CuentaService.login(email, password);
      router.push('/juego');
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isLoading, handleLogin };
};