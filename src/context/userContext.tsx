'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CuentaService } from '@/services/cuentas.service';

interface userContextType {
  userEmail: string | null;
  username: string | null;
  setUser: (email: string, username: string) => void; 
  logout: () => void;
}

export const userContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [isCargando, setIsCargando] = useState(true);

  useEffect(() => {
    const intentarAutoLogin = async () => {
      try {
        const data = await CuentaService.cookieLogin();
        setUserEmailState(data.email);
        setUsernameState(data.username); 
        
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('username', data.username); 
      } catch {
        const emailGuardado = localStorage.getItem('userEmail');
        const usernameGuardado = localStorage.getItem('username'); 
        
        if (emailGuardado && usernameGuardado) {
            setUserEmailState(emailGuardado);
            setUsernameState(usernameGuardado);
        }
      } finally {
        setIsCargando(false);
      }
    };

    intentarAutoLogin();
  }, []);

  const setUser = (email: string, newUsername: string) => {
    setUserEmailState(email);
    setUsernameState(newUsername);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('username', newUsername);
  };

  const logout = async () => {
    try {
      await CuentaService.logout();
    } catch (error) {
      console.error("Error cerrando sesión en servidor, limpiando local de todos modos", error);
    } finally {
      setUserEmailState(null);
      setUsernameState(null); 
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username'); 
      window.location.href = "/"; 
    }
  };

  return (
    <userContext.Provider value={{ userEmail, username, setUser, logout }}>
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