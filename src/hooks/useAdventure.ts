import { useState, useEffect } from 'react';
import { api } from '../api';

interface Location {
  id: string;
  type: string;
  generation: string;
  toLocationIds: string[];
}

interface Actor {
  id: string;
  type: string;
  description: string;
  locationId: string;
}

interface Quest {
  id: string;
  plot: string;
  isCompleted: boolean;
  prerequisiteQuestIds: string[];
  taskIds: string[];
  parentId?: string;
}

interface Adventure {
  plot: string;
  locations: Location[];
  actors: Actor[];
  quests: Quest[];
}

export function useAdventure() {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdventure = async () => {
      try {
        setLoading(true);
        const response = await api.get('/game/adventure');
        setAdventure(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load adventure');
        console.error('Error fetching adventure:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventure();
  }, []);

  return { adventure, loading, error };
}