import { useEffect, useState } from "react";
import { api } from "../api";

export type User = {
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
};

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  console.log("baseurl={}",api.getUri);
  console.log(import.meta.env)

  useEffect(() => {
    api.get("/api/users/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}
