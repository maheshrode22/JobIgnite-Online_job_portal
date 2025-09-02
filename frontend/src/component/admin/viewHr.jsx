import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { viewHr, API_URL } from "../../Services/adminService";

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all | approved | rejected

  useEffect(() => {
    const fetchHR = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          setError("Admin not authenticated");
          setLoading(false);
          return;
        }
        const response = await viewHr(token);
        setHrList(response.data);
      } catch (err) {
        setError("Failed to fetch HR data");
      } finally {
        setLoading(false);
      }
    };
    fetchHR();
  }, []);

  // ✅ Delete HR
  const handleDelete = async (hr_id) => {
    if (!window.confirm("Are you sure you want to delete this HR?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.post(
        `${API_URL}/deleteHr`,
        { id: hr_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHrList(hrList.filter((hr) => hr.hr_id !== hr_id));
      alert("HR deleted successfully!");
    } catch (err) {
      alert("Failed to delete HR");
    }
  };

  // ✅ Update HR Status
  const handleStatusChange = async (hr_id, newStatus) => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.post(
        `${API_URL}/updateStatusHr`,
        { id: hr_id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setHrList(
        hrList.map((item) =>
          item.hr_id === hr_id ? { ...item, status: newStatus } : item
        )
      );

      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Filter logic
  const filteredHR = hrList.filter((hr) => {
    if (activeTab === "approved") return hr.status === "approved";
    if (activeTab === "rejected") return hr.status === "rejected";
    return true; // all
  });

  if (loading) return <p className="text-center mt-5">Loading HR list...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      {/* Tabs */}
      <div className="d-flex mb-4">
        <button
          className={`btn me-2 ${activeTab === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("all")}
        >
          List HR
        </button>
        <button
          className={`btn me-2  text-primary ${activeTab === "approved" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setActiveTab("approved")}
        >
          Approved HR
        </button>
        <button
          className={`btn  text-primary ${activeTab === "rejected" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected HR
        </button>
      </div>

      {/* Table */}
      {filteredHR.length === 0 ? (
        <p className="text-secondary">No HR data found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created At</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHR.map((hr, index) => (
                <tr key={hr.hr_id} className={index % 2 !== 0 ? "table-light" : ""}>
                  <td>{hr.hr_name}</td>
                  <td>{hr.company_name}</td>
                  <td>{hr.email}</td>
                  <td>{hr.phone}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={hr.status || "pending"}
                      onChange={(e) => handleStatusChange(hr.hr_id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{new Date(hr.created_at).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm d-flex align-items-center"
                      onClick={() => handleDelete(hr.hr_id)}
                      title="Delete HR"
                    >
                      <FaTrashAlt className="me-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
