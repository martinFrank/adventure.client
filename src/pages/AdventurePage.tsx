import { useCurrentUser } from "../hooks/useCurrentUser";

export default function AdventurePage() {
  const user = useCurrentUser();

  if (!user) return <p>Lade...</p>;

  return (
    <div>
      <h1>Adventure Page</h1>
      <p>Benutzername: {user.username}</p>
      <p>Vorname: {user.firstName}</p>
      <p>Nachname: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Rollen: {user.roles?.join(", ")}</p>
    </div>
  );
}