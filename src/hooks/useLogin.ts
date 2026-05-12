// src/hooks/useAuth.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CuentaService } from '@/services/cuentas.service'; 
import { useUser} from '@/context/userContext';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 2. Usamos el método dentro del objeto
      const loginData = await CuentaService.login(email, password);
      setUser(email, loginData.username); // Guardamos el email y username en el contexto
      router.push('/juego');
    } catch (err: unknown) {
      setError((err as Error).message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, isLoading, handleLogin };
};