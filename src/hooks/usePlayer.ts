import { useState, useEffect } from 'react';
import { api } from '../api';

interface Player {
  name: string;
  playerClass: string;
  playerRace: string;
  level?: number;
  currentLocationId?: string;
  inventory?: string[];
  health?: number;
  maxHealth?: number;
  [key: string]: any; // für zusätzliche Player-Eigenschaften
}

export function usePlayer() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const response = await api.get('/player/player');
        setPlayer(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load player');
        console.error('Error fetching player:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, []);

  return { player, loading, error };
}