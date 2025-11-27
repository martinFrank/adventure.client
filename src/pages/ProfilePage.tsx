import { useCurrentUser } from "../hooks/useCurrentUser";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="loading">
            <div className="spinner"></div>
            Lade Benutzerdaten...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="text-center" style={{ marginBottom: "var(--spacing-2xl)" }}>
          <div className="adventure-icon" style={{ margin: "0 auto var(--spacing-lg)" }}>
            👤
          </div>
          <h1 className="title">Mein Profil</h1>
          <p className="subtitle">Verwalte deine Kontoinformationen und Einstellungen</p>
        </div>

        <div className="grid grid-cols-2 gap-lg">
          <div className="card">
            <h2 className="text-xl font-bold text-primary mb-lg">
              👤 Persönliche Informationen
            </h2>

            <div className="flex flex-col gap-md">
              <div className="info-group">
                <label>Benutzername</label>
                <span>{user.username}</span>
              </div>

              <div className="info-group">
                <label>Name</label>
                <span>{user.firstName} {user.lastName}</span>
              </div>

              <div className="info-group">
                <label>E-Mail</label>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-primary mb-lg">
              🛡️ Konto & Berechtigungen
            </h2>

            <div className="flex flex-col gap-md">
              <div className="info-group">
                <label>Rollen</label>
                <div className="flex gap-sm flex-wrap">
                  {user.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="status active"
                    >
                      {role}
                    </span>
                  )) || (
                      <span className="text-muted">Keine Rollen zugewiesen</span>
                    )}
                </div>
              </div>

              <div className="status-card">
                <div className="status-icon">✨</div>
                <h3>Abenteurer Status</h3>
                <p>Aktiver Spieler</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-xl">
          <h2 className="text-xl font-bold text-primary mb-lg">
            🎮 Schnellaktionen
          </h2>
          <div className="flex gap-md justify-center flex-wrap">
            <Link to="/adventure" className="btn btn-primary">
              🎯 Adventure starten
            </Link>
            <button className="btn btn-secondary">
              📊 Statistiken
            </button>
            <button className="btn btn-secondary">
              ⚙️ Einstellungen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
