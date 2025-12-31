import { useEffect, useState } from "react";
import { meAPI } from "../api/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    meAPI()
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {!user ? (
        <p>Loading user…</p>
      ) : (
        <>
          <p><b>Name:</b> {user.Name || user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </>
      )}
    </div>
  );
}
