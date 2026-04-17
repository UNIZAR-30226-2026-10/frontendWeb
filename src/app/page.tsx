// src/app/login/page.tsx (o donde tengas tu inicio de sesion)
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import CuadroInicioSesion from "@/components/interfaz/CuadroInicioSesion";

export default function InicioSesion() {
  const { userEmail } = useUser();
  const router = useRouter();

  // Si detectamos que el usuario ya está logueado (por cookie), redirigimos
  useEffect(() => {
    if (userEmail) {
      router.push('/juego');
    }
  }, [userEmail, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c] to-[#0a0f2c] pointer-events-none" />
      <CuadroInicioSesion />
    </main>
  );
}