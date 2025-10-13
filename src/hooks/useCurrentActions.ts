import { useState, useEffect } from 'react';
import { api } from '../api';

interface SkillAction {
  id: string;
  description: string;
  skill: string;
  difficulty: string;
}

export function useCurrentActions() {
  const [actions, setActions] = useState<SkillAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentActions = async () => {
      try {
        setLoading(true);
        const response = await api.get('/game/current-actions');
        setActions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load current actions');
        console.error('Error fetching current actions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentActions();
  }, []);

  return { actions, loading, error };
}