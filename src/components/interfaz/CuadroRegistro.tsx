'use client';

import Link from "next/link"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CuentaService } from '@/services/cuentas.service';

export default function CuadroRegistro() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);

    try {
      await CuentaService.register(email, nombre, password);
      alert("¡Cuenta creada con éxito! Ya puedes iniciar sesión.");
      router.push('/'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Error al registrar la cuenta');
      } else {
        setError('Error al registrar la cuenta');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-[#121943] p-8 rounded-xl shadow-2xl border border-blue-500/30">
      
      {/* FLECHA PARA VOLVER AL INICIO DE SESION */}
      <Link 
        href="/" 
        className="absolute top-5 left-5 text-gray-400 hover:text-white transition-colors text-2xl z-20"
        title="Volver al inicio"
      >
        ←
      </Link>

      <div className="flex flex-col items-center mb-8">
        <div className="text-4xl mb-2 text-white font-bold tracking-tighter">S&E REMIX</div>
        <h1 className="text-2xl font-bold text-blue-300 tracking-tight">Crear Cuenta</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="flex flex-col gap-6">
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
          <label className="text-blue-300 text-xs font-semibold uppercase ml-1">Nombre de Usuario</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-[#0a0f2c] border border-blue-900 focus:border-blue-400 outline-none text-white p-3 rounded-md transition-all"
            placeholder="Tu nombre"
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

        <div className="flex flex-col gap-2">
          <label className="text-blue-300 text-xs font-semibold uppercase ml-1">Confirmar Contraseña</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="bg-[#0a0f2c] border border-blue-900 focus:border-blue-400 outline-none text-white p-3 rounded-md transition-all"
            placeholder="••••••••"
            required 
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition-all shadow-lg shadow-blue-900/50 mt-2 active:scale-95 disabled:opacity-50"
        >
          {cargando ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </button>
      </form>
    </div> 
  );
}