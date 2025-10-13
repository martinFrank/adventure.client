import { useState, useEffect } from 'react';
import { api } from '../api';

interface Location {
  id: string;
  type: string;
  generation: string;
  toLocationIds: string[];
}

export function useCurrentDestinations() {
  const [destinations, setDestinations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentDestinations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/game/current-destinations');
        setDestinations(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load current destinations');
        console.error('Error fetching current destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentDestinations();
  }, []);

  return { destinations, loading, error };
}