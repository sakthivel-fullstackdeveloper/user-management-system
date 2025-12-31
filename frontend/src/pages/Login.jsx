import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "user") navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 403) {
          setErrorMsg("Your account is deactivated. Please contact the admin.");
        } else if (status === 401) {
          setErrorMsg("Invalid email or password.");
        } else if (status === 400) {
          setErrorMsg("Email and password are required.");
        } else {
          setErrorMsg("Something went wrong. Try again later.");
        }
      } else {
        setErrorMsg("Server unreachable. Check backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      {errorMsg && (
        <div className="alert alert-danger">{errorMsg}</div>
      )}

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
