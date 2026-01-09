import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://backend.usermanage.fwitech.com/admin/users?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch {
      setLoading(false);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const activateUser = async (id) => {
    await axios.patch(
      `https://backend.usermanage.fwitech.com/admin/users/${id}/activate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const deactivateUser = async (id) => {
    await axios.patch(
      `https://backend.usermanage.fwitech.com/admin/users/${id}/deactivate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  return (
    <div className="container-fluid px-2 px-md-4 mt-3">
      <h2 className="text-center text-md-start">Admin Dashboard</h2>
      <p className="text-muted text-center text-md-start">Manage users</p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="d-none d-md-block table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.Name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <span
                        className={
                          u.status === "active"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }
                      >
                        {u.status}
                      </span>
                    </td>
                    <td>
                      {u.status === "inactive" ? (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => activateUser(u._id)}
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deactivateUser(u._id)}
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-md-none">
            {users.map((u) => (
              <div key={u._id} className="card mb-2">
                <div className="card-body">
                  <h6 className="mb-1">{u.Name}</h6>
                  <p className="mb-1 small">{u.email}</p>
                  <p className="mb-1 small">Role: {u.role}</p>
                  <span
                    className={
                      u.status === "active"
                        ? "badge bg-success"
                        : "badge bg-secondary"
                    }
                  >
                    {u.status}
                  </span>
                  <div className="mt-2">
                    {u.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-success w-100"
                        onClick={() => activateUser(u._id)}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-danger w-100"
                        onClick={() => deactivateUser(u._id)}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mt-3">
        <button
          disabled={page === 1}
          className="btn btn-outline-primary w-100 w-sm-auto"
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          className="btn btn-outline-primary w-100 w-sm-auto"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
