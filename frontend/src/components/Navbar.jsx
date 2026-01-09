import { Link, useNavigate } from "react-router-dom";
import { logoutAPI } from "../api/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    await logoutAPI();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        User Management
      </Link>

      {/* HAMBURGER BUTTON */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* COLLAPSIBLE MENU */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-2 mt-lg-0">

          {!token ? (
            <>
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>

              <Link className="btn btn-light" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light" to="/dashboard">
                Dashboard
              </Link>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
