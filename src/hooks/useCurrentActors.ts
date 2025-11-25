import { useState, useEffect } from 'react';
import { api } from '../api';

interface Actor {
  id: string;
  type: string;
  description: string;
  locationId: string;
}

export function useCurrentActors() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentActors = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/game/current-actors');
      setActors(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load current actors');
      console.error('Error fetching current actors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentActors();
  }, []);

  const refetch = () => {
    fetchCurrentActors();
  };

  return { actors, loading, error, refetch };
}