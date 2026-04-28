'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/userContext';
import CuadroInicioSesion from "@/components/interfaz/CuadroInicioSesion";

export default function InicioSesion() {
  const { userEmail, logout } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (userEmail) {
      router.push('/juego');
    }
  }, [userEmail, router, searchParams, logout]);

  return (
    <main className="min-h-screen bg-[#0a0f2c] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f2c] to-[#0a0f2c] pointer-events-none" />
      <CuadroInicioSesion />
    </main>
  );
}