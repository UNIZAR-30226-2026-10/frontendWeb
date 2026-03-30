// src/components/interfaz/CuadroInicioSesion.tsx
'use client';
import Link from "next/link";
import { useAuth } from "@/hooks/useLogin";

export default function CuadroInicioSesion() {
  // Extraemos toda la lógica de nuestro Custom Hook
  const {
    email, setEmail,
    password, setPassword,
    error, isLoading, handleLogin
  } = useAuth();

  return (
    <div className="relative z-10 w-full max-w-md bg-[#121943] p-8 rounded-xl shadow-2xl border border-blue-500/30">
      <div className="flex flex-col items-center mb-8">
        <div className="text-4xl mb-2 text-white font-bold">S&E REMIX</div>
        <h1 className="text-3xl font-bold text-white tracking-tight">¡Bienvenido! Inicia Sesion</h1>
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

        {error && (
          <div className="text-red-200 text-sm font-bold text-center bg-red-900/60 p-3 rounded-md border border-red-500 ">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`font-bold py-3 rounded-md transition-colors shadow-lg mt-2 text-white
            ${isLoading 
              ? 'bg-blue-800 cursor-not-allowed text-gray-300' 
              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/50'}`}
        >
          {isLoading ? 'INICIANDO...' : 'INICIAR SESIÓN'}
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
