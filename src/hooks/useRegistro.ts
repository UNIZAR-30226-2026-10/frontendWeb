// src/hooks/useRegister.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Importamos el objeto
import { CuentaService } from '@/services/cuentas.service';

export const useRegister = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // 2. Llamamos al método dentro del objeto
      await CuentaService.register(email, username, password);
      router.push('/'); 
    } catch (err: unknown) {
      setError((err as Error).message || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email, setEmail, username, setUsername, password, setPassword,
    passwordConfirm, setPasswordConfirm, error, isLoading, handleRegister
  };
};