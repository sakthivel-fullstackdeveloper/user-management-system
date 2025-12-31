import { useState } from "react";
import { signupAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    Name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupAPI(form);
    alert("Signup success");
    navigate("/login");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h3>Signup</h3>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="Name" placeholder="Name"
          onChange={handleChange} required />

        <input className="form-control mb-2" name="email" placeholder="Email"
          onChange={handleChange} required />

        <input className="form-control mb-2" type="password" name="password" placeholder="Password"
          onChange={handleChange} required />

        <select className="form-control mb-3" name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
}
