import { useState } from "react";
import { loginAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await loginAPI({ email, password });

    localStorage.setItem("token", res.data.token);

    alert("Login success");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 450 }}>
      <h3>Login</h3>

      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} required />

        <input className="form-control mb-3" type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} required />

        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}
