import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAdventure } from "../hooks/useAdventure";
import { usePlayer } from "../hooks/usePlayer";
import './AdventurePage.css';

export default function AdventurePage() {
  const user = useCurrentUser();
  const { adventure, loading: adventureLoading, error: adventureError } = useAdventure();
  const { player, loading: playerLoading, error: playerError } = usePlayer();

  if (!user) {
    return (
      <div className="adventure-page">
        <div className="adventure-content">
          <div className="loading">
            <div className="spinner"></div>
            Lade Benutzerdaten...
          </div>
        </div>
      </div>
    );
  }

  if (adventureLoading || playerLoading) {
    return (
      <div className="adventure-page">
        <div className="adventure-content">
          <div className="adventure-loading">
            <div className="spinner"></div>
            Lade Adventure und Spielerdaten...
          </div>
        </div>
      </div>
    );
  }

  if (adventureError || playerError) {
    return (
      <div className="adventure-page">
        <div className="adventure-content">
          <div className="adventure-error">
            <h2>⚠️ Fehler beim Laden der Daten</h2>
            {adventureError && <p>Adventure: {adventureError}</p>}
            {playerError && <p>Spieler: {playerError}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="adventure-page">
        <div className="adventure-content">
          <div className="adventure-error">
            <h2>📭 Keine Adventure-Daten verfügbar</h2>
            <p>Es konnten keine Adventure-Daten geladen werden.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adventure-page">
      <div className="adventure-content">
        <header className="adventure-header">
          <div>
            <h1>🗡️ Adventure Game</h1>
            <div className="player-info">
              <div className="user-info">
                <span>Spieler: {user.firstName} {user.lastName}</span>
              </div>
              {player && (
                <div className="character-info">
                  <span>Charakter: {player.name}</span>
                  <span className="character-details">
                    {player.playerRace} {player.playerClass}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="plot-section">
          <h2>📖 Geschichte</h2>
          <p className="plot-text">{adventure.plot}</p>
        </section>

        <div className="game-panels">
          <section className="locations-panel">
            <h3>🗺️ Orte ({adventure.locations?.length || 0})</h3>
            <div className="locations-grid">
              {adventure.locations?.map((location) => (
                <div key={location.id} className="location-card">
                  <h4>📍 {location.type.replace(/_/g, ' ')}</h4>
                  <p>{location.generation}</p>
                  <div className="connections">
                    <small>🔗 Verbindungen: {location.toLocationIds?.length || 0}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="actors-panel">
            <h3>👥 Charaktere ({adventure.actors?.length || 0})</h3>
            <div className="actors-list">
              {adventure.actors?.map((actor) => (
                <div key={actor.id} className="actor-card">
                  <h4>🎭 {actor.id.replace(/_/g, ' ')}</h4>
                  <p>{actor.description}</p>
                  <div className="actor-location">
                    <small>📍 Ort: {actor.locationId?.replace(/_/g, ' ')}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="quests-panel">
            <h3>🎯 Quests ({adventure.quests?.length || 0})</h3>
            <div className="quests-list">
              {adventure.quests?.map((quest) => (
                <div key={quest.id} className={`quest-card ${quest.isCompleted ? 'completed' : 'active'}`}>
                  <h4>
                    {quest.isCompleted ? '✅' : '🎯'} {quest.id.replace(/_/g, ' ')}
                  </h4>
                  <p>{quest.plot}</p>
                  <div className="quest-status">
                    <span className={`status ${quest.isCompleted ? 'completed' : 'active'}`}>
                      {quest.isCompleted ? 'Abgeschlossen' : 'Aktiv'}
                    </span>
                    {quest.taskIds && quest.taskIds.length > 0 && (
                      <small>📋 Aufgaben: {quest.taskIds.length}</small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}