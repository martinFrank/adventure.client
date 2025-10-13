import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAdventure } from "../hooks/useAdventure";
import { usePlayer } from "../hooks/usePlayer";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
import { useCurrentActors } from "../hooks/useCurrentActors";
import { useCurrentActions } from "../hooks/useCurrentActions";
import './AdventurePage.css';

export default function AdventurePage() {
  const user = useCurrentUser();
  //const { adventure, loading: adventureLoading, error: adventureError } = useAdventure();
  const { player, loading: playerLoading, error: playerError } = usePlayer();
  const { location, loading: locationLoading, error: locationError } = useCurrentLocation();
  const { actors, loading: actorsLoading, error: actorsError } = useCurrentActors();
  const { actions, loading: actionsLoading, error: actionsError } = useCurrentActions();

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

  if (playerLoading || locationLoading || actorsLoading || actionsLoading) {
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

  if (playerError || locationError || actorsError || actionsError) {
    return (
      <div className="adventure-page">
        <div className="adventure-content">
          <div className="adventure-error">
            <h2>⚠️ Fehler beim Laden der Daten</h2>
            {playerError && <p>Spieler: {playerError}</p>}
            {locationError && <p>Location: {locationError}</p>}
            {actorsError && <p>Actors: {actorsError}</p>}
            {actionsError && <p>Actions: {actionsError}</p>}
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

        <div className="game-panels">
          <section className="locations-panel">
            <h3>🗺️ Aktueller Ort</h3>
            <div className="locations-grid">
              {location ? (
                <div className="location-card current-location">
                  <h4>📍 {location.type.replace(/_/g, ' ')}</h4>
                  <p>{location.generation}</p>
                  <div className="connections">
                    <small>🔗 Verbindungen: {location.toLocationIds?.length || 0}</small>
                  </div>
                </div>
              ) : (
                <p>Keine Location verfügbar</p>
              )}
            </div>
          </section>

          <section className="actors-panel">
            <h3>👥 Charaktere am aktuellen Ort ({actors?.length || 0})</h3>
            <div className="actors-list">
              {actors && actors.length > 0 ? (
                actors.map((actor) => (
                  <div key={actor.id} className="actor-card">
                    <h4>🎭 {actor.id.replace(/_/g, ' ')}</h4>
                    <p>{actor.description}</p>
                  </div>
                ))
              ) : (
                <p>Keine Charaktere am aktuellen Ort</p>
              )}
            </div>
          </section>

          <section className="actions-panel">
            <h3>⚡ Verfügbare Aktionen ({actions?.length || 0})</h3>
            <div className="actions-list">
              {actions && actions.length > 0 ? (
                actions.map((action) => (
                  <div key={action.id} className="action-card">
                    <h4>⚡ {action.description}</h4>
                    <div className="action-details">
                      <span className="skill">🎯 {action.skill}</span>
                      <span className="difficulty">📊 {action.difficulty}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Keine Aktionen verfügbar</p>
              )}
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}