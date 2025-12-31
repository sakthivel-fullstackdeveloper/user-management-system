import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data.user);
        setForm({
          name: res.data.user.Name || res.data.user.name,
          email: res.data.user.email
        });
      })
      .catch(() => setError("Failed to load user"))
      .finally(() => setLoading(false));
  }, []);


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:3000/user/me",
        { name: form.name, email: form.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setChangingPassword(true);
    setMessage("");
    setError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match.");
      setChangingPassword(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:3000/user/me/password",
        {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Password changed successfully.");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      if (err.response?.status === 400) setError("Incorrect old password.");
      else setError("Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) return <p className="container mt-4">Loading user…</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h2>User Dashboard</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

     
      <div className="card p-3 mb-3">
        <h5>Profile Information</h5>

        <p><b>Role:</b> {user.role}</p>
        <p><b>Account Status:</b> {user.status}</p>
      </div>

 
      <div className="card p-3 mb-3">
        <h5>Edit Profile</h5>

        <form onSubmit={handleProfileUpdate}>
          <input
            className="form-control mb-2"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <button className="btn btn-primary" disabled={savingProfile}>
            {savingProfile ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving…
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>

      <div className="card p-3">
        <h5>Change Password</h5>

        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Old Password"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
            required
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
            }
            required
          />

          <button className="btn btn-warning" disabled={changingPassword}>
            {changingPassword ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Changing…
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
