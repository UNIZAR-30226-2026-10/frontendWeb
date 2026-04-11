'use client';

import { useEffect, useRef, useState } from 'react';
import { Amigo } from '@/types/amigo';
import { AmigosService } from '@/services/amigos.service';

const POLLING_MIN_MS = 10_000;
const POLLING_MAX_MS = 15_000;

const getRandomPollingInterval = () => {
  return Math.floor(Math.random() * (POLLING_MAX_MS - POLLING_MIN_MS + 1)) + POLLING_MIN_MS;
};

export const useAmigos = (email: string) => {
  const [amigos, setAmigos] = useState<Amigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!email) {
      setAmigos([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const fetchAmigos = async (showLoader: boolean) => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;

      try {
        if (showLoader && isMounted) {
          setIsLoading(true);
        }

        if (isMounted) {
          setError(null);
        }

        const amigosList = await AmigosService.getAmigos(email);

        if (isMounted) {
          setAmigos(amigosList);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error al cargar los amigos');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }

        isFetchingRef.current = false;
      }
    };

    const scheduleNextFetch = () => {
      timeoutId = setTimeout(async () => {
        await fetchAmigos(false);
        if (isMounted) {
          scheduleNextFetch();
        }
      }, getRandomPollingInterval());
    };

    fetchAmigos(true).finally(() => {
      if (isMounted) {
        scheduleNextFetch();
      }
    });

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      isFetchingRef.current = false;
    };
  }, [email]);

  return {
    amigos,
    isLoading,
    error,
  };
};
