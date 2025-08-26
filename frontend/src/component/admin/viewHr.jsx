import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { viewHr } from "../../Services/adminService"; // import your service

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHR = async () => {
      try {
        const token = localStorage.getItem("admindToken");
        if (!token) {
          setError("Admin not authenticated");
          setLoading(false);
          return;
        }

        const response = await viewHr(token); // call service layer
        setHrList(response.data);
      } catch (err) {
        console.error("Error fetching HR data:", err);
        setError("Failed to fetch HR data");
      } finally {
        setLoading(false);
      }
    };

    fetchHR();
  }, []);

  const handleDelete = async (hr_id) => {
    if (!window.confirm("Are you sure you want to delete this HR?")) return;

    try {
      const token = localStorage.getItem("admindToken");
      await axios.post(
        "http://localhost:3000/deleteHr",
        { id: hr_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHrList(hrList.filter((hr) => hr.hr_id !== hr_id));
    } catch (err) {
      console.error("Error deleting HR:", err);
      alert("Failed to delete HR");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading HR list...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">All HRs</h2>
      {hrList.length === 0 ? (
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
                <th>Created At</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {hrList.map((hr, index) => (
                <tr key={hr.hr_id} className={index % 2 !== 0 ? "table-light" : ""}>
                  <td>{hr.hr_name}</td>
                  <td>{hr.company_name}</td>
                  <td>{hr.email}</td>
                  <td>{hr.phone}</td>
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
