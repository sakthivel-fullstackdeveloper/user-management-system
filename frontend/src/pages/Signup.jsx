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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.Name.trim()) newErrors.Name = "Name is required";
    if (!validateEmail(form.email)) newErrors.email = "Invalid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      await signupAPI(form);

      // ⚠️ no toast shown here
      // ⏩ redirect only
      navigate("/login");
    } catch (err) {
      setErrors({
        api: err?.response?.data?.message || "Signup failed"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h3>Signup</h3>

      {errors.api && (
        <div className="alert alert-danger">{errors.api}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-1"
          name="Name"
          placeholder="Name"
          onChange={handleChange}
        />
        {errors.Name && <small className="text-danger">{errors.Name}</small>}

        <input
          className="form-control mb-1"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        <input
          className="form-control mb-1"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}

        <select
          className="form-control mb-3"
          name="role"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Creating account...
            </>
          ) : (
            "Signup"
          )}
        </button>
      </form>
    </div>
  );
}
