import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { viewSeeker } from "../../Services/adminService";

export default function ViewSeeker() {
  const [seekerList, setSeekerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const token = localStorage.getItem("admindToken");
        if (!token) {
          setError("Admin not authenticated");
          setLoading(false);
          return;
        }

        const response = await viewSeeker(token);
        // Sort by newest first
        const sortedData = response.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setSeekerList(sortedData);
      } catch (err) {
        console.error("Error fetching seeker data:", err);
        setError("Failed to fetch seeker data");
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  const handleViewProfile = (seeker_id) => {
    navigate(`/admin/seekerProfile/${seeker_id}`);
  };

  if (loading) return <p className="text-center mt-5">Loading seekers...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">All Job Seekers</h2>
      {seekerList.length === 0 ? (
        <p className="text-secondary">No seekers found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="text-white" style={{ backgroundColor: "black" }}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created At</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {seekerList.map((seeker, index) => (
                <tr key={seeker.seeker_id} className={index % 2 === 0 ? "" : "table-light"}>
                  <td>{index + 1}</td> {/* ✅ Serial Number */}
                  <td>{seeker.name}</td>
                  <td>{seeker.email}</td>
                  <td>{seeker.phone || "-"}</td>
                  <td>{seeker.address || "-"}</td>
                  <td>{new Date(seeker.created_at).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                      onClick={() => handleViewProfile(seeker.seeker_id)}
                      title="View Profile"
                    >
                      <FaEye className="me-1" /> View
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
