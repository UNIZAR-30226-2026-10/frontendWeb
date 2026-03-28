// src/hooks/useRegister.ts
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerService } from '@/services/registro.service';

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

    // 1. Validación Frontend: Las contraseñas deben ser iguales
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // 2. Validación Frontend: Contraseña segura (opcional pero recomendado)
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // 3. Llamamos a la API
      await registerService(email, username, password);
      
      // 4. Si todo va bien, lo mandamos al inicio de sesión
      // (O podrías mandarlo directamente a '/juego' si tu API hace auto-login)
      router.push('/'); 
      
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email, setEmail,
    username, setUsername,
    password, setPassword,
    passwordConfirm, setPasswordConfirm,
    error, isLoading, handleRegister
  };
};
