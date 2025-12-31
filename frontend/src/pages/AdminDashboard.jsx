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
        `http://localhost:3000/admin/users?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const activateUser = async (id) => {
    await axios.patch(
      `http://localhost:3000/admin/users/${id}/activate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  const deactivateUser = async (id) => {
    await axios.patch(
      `http://localhost:3000/admin/users/${id}/deactivate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers();
  };

  return (
    <div className="container mt-4">

      <h2>Admin Dashboard</h2>
      <p className="text-muted">Manage users</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
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
      )}

      <div className="d-flex justify-content-between">
        <button
          disabled={page === 1}
          className="btn btn-outline-primary"
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          className="btn btn-outline-primary"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
