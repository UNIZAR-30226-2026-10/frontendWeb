'use client';
import Link from "next/link"; // Importación estándar
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/'); 
  };

  return (
    <main className="min-h-screen bg-[#0a0f2c] flex items-center justify-center p-4">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c] to-[#0a0f2c] pointer-events-none" />
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 w-full max-w-md bg-[#121943] p-8 rounded-xl shadow-2xl border border-blue-500/30">
        
        {/* FLECHA PARA VOLVER AL INICIO DE SESION*/}
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

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-blue-300 text-xs font-semibold uppercase ml-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0a0f2c] border border-blue-900 focus:border-blue-400 outline-none text-white p-3 rounded-md transition-all"
              placeholder="tu@email.com"
              //required (esto es para el principio, luego se descomenta)
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
              //required (esto es para el principio, luego se descomenta)
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
              //required (esto es para el principio, luego se descomenta)
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
              //required (esto es para el principio, luego se descomenta)
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition-all shadow-lg shadow-blue-900/50 mt-2 active:scale-95">
            CREAR CUENTA
          </button>
        </form>
      </div> {/* Cierre del contenedor principal */}
    </main>
  );
}