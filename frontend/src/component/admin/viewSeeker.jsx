import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaSearch,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSpinner,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUsers,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { viewSeeker } from "../../Services/adminService";
import "../../css/admin/viewSeeker.css";

export default function ViewSeeker() {
  const [seekerList, setSeekerList] = useState([]);
  const [filteredSeekers, setFilteredSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          setError("Admin not authenticated");
          setLoading(false);
          return;
        }

        const response = await viewSeeker(token);
        // sort newest first
        const sortedData = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setSeekerList(sortedData);
        setFilteredSeekers(sortedData);
      } catch (err) {
        console.error("Error fetching seeker data:", err);
        setError("Failed to fetch seeker data");
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = seekerList;

    if (searchTerm) {
      filtered = filtered.filter(seeker =>
        seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seeker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (seeker.phone && seeker.phone.includes(searchTerm)) ||
        (seeker.address && seeker.address.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "created_at") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredSeekers(filtered);
    setCurrentPage(1);
  }, [seekerList, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewProfile = (seeker_id) => {
    navigate(`/admin/seekerProfile/${seeker_id}`);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSeekers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSeekers = filteredSeekers.slice(startIndex, endIndex);

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-muted" />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  if (loading) {
    return (
      <div className="view-seeker-container">
        <div className="loading-container">
          <FaSpinner className="fa-spin me-2" />
          Loading job seekers...
        </div>
      </div>
      
    );
  }

  if (error) {
    return (
      <div className="view-seeker-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-seeker-container">
      {/* Header Section */}
      <div className="seeker-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title">
              <FaUsers className="me-3" />
              Job Seekers Management
            </h1>
            <p className="header-subtitle">
              Manage and monitor all registered job seekers in your platform
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{seekerList.length}</div>
              <div className="stat-label">Total Seekers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{filteredSeekers.length}</div>
              <div className="stat-label">Filtered Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="seeker-content">
        {filteredSeekers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No Job Seekers Found</h3>
            <p>
              {searchTerm
                ? "No seekers match your search criteria. Try adjusting your search terms."
                : "No job seekers have registered yet."
              }
            </p>
            {searchTerm && (
              <button
                className="btn btn-primary"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table Section */}
            <div className="table-container">
              <div className="table-card">
                <div className="table-header">
                  <h5 className="table-title">Job Seekers List</h5>
                  <div className="table-info">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredSeekers.length)} of {filteredSeekers.length} seekers
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="seeker-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("name")} className="sortable">
                          <div className="th-content">
                            <FaUser className="me-2" />
                            Name
                            {getSortIcon("name")}
                          </div>
                        </th>
                        <th onClick={() => handleSort("email")} className="sortable">
                          <div className="th-content">
                            <FaEnvelope className="me-2" />
                            Email
                            {getSortIcon("email")}
                          </div>
                        </th>
                        <th onClick={() => handleSort("phone")} className="sortable d-none d-md-table-cell">
                          <div className="th-content">
                            <FaPhone className="me-2" />
                            Phone
                            {getSortIcon("phone")}
                          </div>
                        </th>
                        <th className="d-none d-lg-table-cell">
                          <div className="th-content">
                            <FaMapMarkerAlt className="me-2" />
                            Address
                          </div>
                        </th>
                        <th onClick={() => handleSort("created_at")} className="sortable">
                          <div className="th-content">
                            <FaCalendarAlt className="me-2" />
                            Joined
                            {getSortIcon("created_at")}
                          </div>
                        </th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSeekers.map((seeker, index) => (
                        <tr key={seeker.seeker_id} className="seeker-row">
                          <td>
                            <div className="seeker-info">
                              <div className="seeker-avatar">
                                {seeker.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="seeker-details">
                                <div className="seeker-name">{seeker.name}</div>
                                <div className="seeker-id">ID: {seeker.seeker_id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="email-cell">
                              <FaEnvelope className="me-2 text-muted" />
                              {seeker.email}
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="phone-cell">
                              {seeker.phone ? (
                                <>
                                  <FaPhone className="me-2 text-muted" />
                                  {seeker.phone}
                                </>
                              ) : (
                                <span className="text-muted">Not provided</span>
                              )}
                            </div>
                          </td>
                          <td className="d-none d-lg-table-cell">
                            <div className="address-cell">
                              {seeker.address ? (
                                <>
                                  <FaMapMarkerAlt className="me-2 text-muted" />
                                  {seeker.address}
                                </>
                              ) : (
                                <span className="text-muted">Not provided</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="date-cell">
                              <FaCalendarAlt className="me-2 text-muted" />
                              {new Date(seeker.created_at).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-view"
                              onClick={() => handleViewProfile(seeker.seeker_id)}
                            >
                              <FaEye className="me-2" />
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="pagination-controls">
                  <button
                    className="btn btn-pagination"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`btn btn-pagination ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="btn btn-pagination"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
