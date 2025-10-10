import { useState, useEffect } from 'react';
import { api } from '../api';

interface Location {
  id: string;
  type: string;
  generation: string;
  toLocationIds: string[];
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        setLoading(true);
        const response = await api.get('/game/current-location');
        setLocation(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load current location');
        console.error('Error fetching current location:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentLocation();
  }, []);

  return { location, loading, error };
}