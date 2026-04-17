'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface userContextType {
  userEmail: string | null;
  setUserEmail: (email: string) => void;
  logout: () => void;
}

const userContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [isCargandoMemoria, setIsCargandoMemoria] = useState(true);

  // 1. Al cargar la web (o hacer F5), buscamos en la "memoria a largo plazo"
  useEffect(() => {
    const emailGuardado = localStorage.getItem('userEmail');
    if (emailGuardado) {
      setUserEmailState(emailGuardado);
    }
    setIsCargandoMemoria(false); // Ya hemos terminado de buscar
  }, []);

  // 2. Función mejorada para guardar sesión
  const setUserEmail = (email: string) => {
    setUserEmailState(email); // Lo guarda en la memoria rápida (React)
    localStorage.setItem('userEmail', email); // Lo guarda en la memoria a largo plazo (Navegador)
  };

  // 3. Función para cerrar sesión y limpiar todo
  const logout = () => {
    setUserEmailState(null);
    localStorage.removeItem('userEmail');
  };

  return (
    <userContext.Provider value={{ userEmail, setUserEmail, logout }}>
      {/* Evitamos dibujar la web hasta que hayamos revisado el LocalStorage, así evitamos parpadeos */}
      {!isCargandoMemoria && children}
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