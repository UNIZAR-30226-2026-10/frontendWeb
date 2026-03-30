// src/components/interfaz/CuadroRegistro.tsx
'use client';
import Link from "next/link";
import { useRegister } from "@/hooks/useRegistro";

export default function CuadroRegistro() {
  const {
    email, setEmail,
    username, setUsername,
    password, setPassword,
    passwordConfirm, setPasswordConfirm,
    error, isLoading, handleRegister
  } = useRegister();

  return (
    <div className="relative z-10 w-full max-w-md bg-[#121943] p-8 rounded-xl shadow-2xl border border-blue-500/30">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {/* Caja de errores en rojo */}
        {error && (
          <div className="text-red-200 text-sm font-bold text-center bg-red-900/60 p-3 rounded-md border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`py-3 rounded-md transition-all shadow-lg mt-2 font-bold text-white
            ${isLoading 
              ? 'bg-blue-800 cursor-not-allowed text-gray-300' 
              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/50 active:scale-95'}`}
        >
          {isLoading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </button>
      </form>
    </div>
  );
}
