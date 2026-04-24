'use client';

import Link from "next/link"; // Ojo: La importación correcta en Next es 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CuentaService } from '@/services/cuentas.service';
import { useUser } from '@/context/userContext';

export default function CuadroInicioSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const router = useRouter();
  const { setUserEmail } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await CuentaService.login(email, password);
      setUserEmail(email);
      router.push('/juego'); 
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-[#121943] p-8 rounded-xl shadow-2xl border border-blue-500/30">
      <div className="flex flex-col items-center mb-8">
        <div className="text-4xl mb-2 text-white font-bold">S&E REMIX</div>
        <h1 className="text-3xl font-bold text-white tracking-tight">¡Bienvenido! Inicia Sesion</h1>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-blue-300 text-xs font-semibold uppercase ml-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0a0f2c] border border-blue-900 focus:border-blue-400 outline-none text-white p-3 rounded-md transition-all"
            placeholder="tu@email.com"
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-blue-300 text-xs font-semibold uppercase ml-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0a0f2c] border border-blue-900 focus:border-blue-400 outline-none text-white p-3 rounded-md transition-all"
            placeholder="••••••••"
            required 
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition-colors shadow-lg shadow-blue-900/50 mt-2 disabled:opacity-50"
        >
          {cargando ? 'ENTRANDO...' : 'INICIAR SESIÓN'}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm"> ¿No tienes cuenta?
          <Link href="/registro" className="text-blue-400 hover:text-blue-300 font-bold transition-colors hover:underline ml-1">
            Regístrate
          </Link>
          </p>
        </div>
      </form>
    </div>
  );
}