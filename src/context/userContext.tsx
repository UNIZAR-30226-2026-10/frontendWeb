'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CuentaService } from '@/services/cuentas.service';

interface userContextType {
  userEmail: string | null;
  setUserEmail: (email: string) => void;
  logout: () => void;
}

const userContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [isCargando, setIsCargando] = useState(true);

  useEffect(() => {
    const intentarAutoLogin = async () => {
      try {
        // Intentamos validar la cookie en el backend
        const data = await CuentaService.cookieLogin();
        setUserEmailState(data.email);
        localStorage.setItem('userEmail', data.email);
      } catch (error) {
        // Si falla (no hay cookie o expiró), miramos si hay algo en localStorage por si acaso
        const emailGuardado = localStorage.getItem('userEmail');
        if (emailGuardado) setUserEmailState(emailGuardado);
      } finally {
        setIsCargando(false);
      }
    };

    intentarAutoLogin();
  }, []);

  const setUserEmail = (email: string) => {
    setUserEmailState(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = async () => {
    try {
      // 1. Avisamos al backend para que borre las cookies 'session' y 'autologin'
      await CuentaService.logout();
    } catch (error) {
      console.error("Error cerrando sesión en servidor, limpiando local de todos modos", error);
    } finally {
      // 2. Limpiamos rastro local
      setUserEmailState(null);
      localStorage.removeItem('userEmail');
      // 3. Redirigimos a la raíz (donde está el login)
      window.location.href = "/"; 
    }
  };

  return (
    <userContext.Provider value={{ userEmail, setUserEmail, logout }}>
      {!isCargando && children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}