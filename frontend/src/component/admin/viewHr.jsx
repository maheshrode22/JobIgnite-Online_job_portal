import React, { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSearch,
  FaSpinner,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserTie,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFilter,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";
import axios from "axios";
import { viewHr, API_URL } from "../../Services/adminService";
import "../../css/admin/viewHr.css";

export default function ViewHR() {
  const [hrList, setHrList] = useState([]);
  const [filteredHR, setFilteredHR] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
        // sort newest first
        const sorted = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setHrList(sorted);
        setFilteredHR(sorted);
      } catch (err) {
        setError("Failed to fetch HR data");
      } finally {
        setLoading(false);
      }
    };
    fetchHR();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = hrList;

    // Filter by tab
    if (activeTab === "approved") {
      filtered = filtered.filter(hr => hr.status === "approved");
    } else if (activeTab === "rejected") {
      filtered = filtered.filter(hr => hr.status === "rejected");
    } else if (activeTab === "pending") {
      filtered = filtered.filter(hr => hr.status === "pending");
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hr =>
        hr.hr_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hr.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (hr.phone && hr.phone.includes(searchTerm))
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

    setFilteredHR(filtered);
    setCurrentPage(1);
  }, [hrList, activeTab, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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

  const handleStatusChange = async (hr_id, newStatus) => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.post(
        `${API_URL}/updateStatusHr`,
        { id: hr_id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHrList(
        hrList.map((item) =>
          item.hr_id === hr_id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredHR.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredHR.slice(startIndex, endIndex);

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-muted" />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-success" />;
      case "rejected":
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaClock className="text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClass = "status-badge";
    switch (status) {
      case "approved":
        return `${baseClass} status-approved`;
      case "rejected":
        return `${baseClass} status-rejected`;
      default:
        return `${baseClass} status-pending`;
    }
  };

  // Pagination helper functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="view-hr-container">
        <div className="loading-container">
          <FaSpinner className="fa-spin me-2" />
          Loading HR data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-hr-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Data</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-hr-container">
      {/* Header Section */}
      <div className="hr-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title">
              <FaUserTie className="me-3" />
              HR Management
            </h1>
            <p className="header-subtitle">
              Manage and monitor all registered HR accounts with approvals, rejections, and deletions
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{hrList.length}</div>
              <div className="stat-label">Total HRs</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{hrList.filter(hr => hr.status === "approved").length}</div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{hrList.filter(hr => hr.status === "pending").length}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{filteredHR.length}</div>
              <div className="stat-label">Filtered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <FaUser className="me-2" />
            All ({hrList.length})
          </button>
          <button
            className={`tab-button ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            <FaCheckCircle className="me-2" />
            Approved ({hrList.filter(hr => hr.status === "approved").length})
          </button>
          <button
            className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            <FaClock className="me-2" />
            Pending ({hrList.filter(hr => hr.status === "pending").length})
          </button>
          <button
            className={`tab-button ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => setActiveTab("rejected")}
          >
            <FaTimesCircle className="me-2" />
            Rejected ({hrList.filter(hr => hr.status === "rejected").length})
          </button>
        </div>
      </div>

      {/* Search and Items Per Page Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, company, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0 text-muted">Items per page:</label>
              <select
                className="form-select form-select-sm"
                style={{ width: "80px" }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hr-content">
        {filteredHR.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👔</div>
            <h3>No HR Found</h3>
            <p>
              {searchTerm || activeTab !== "all"
                ? "No HR accounts match your current filters. Try adjusting your search or filter criteria."
                : "No HR accounts have registered yet."
              }
            </p>
            {(searchTerm || activeTab !== "all") && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Table Section */}
            <div className="table-container">
              <div className="table-card">
                <div className="table-header">
                  <h5 className="table-title">HR Accounts List</h5>
                  <div className="table-info">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredHR.length)} of {filteredHR.length} HR accounts
                  </div>
                </div>

                <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                  <table className="hr-table">
                    <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                      <tr>
                        <th onClick={() => handleSort("hr_name")} className="sortable">
                          <div className="th-content">
                            <FaUser className="me-2" />
                            Name
                            {getSortIcon("hr_name")}
                          </div>
                        </th>
                        <th onClick={() => handleSort("company_name")} className="sortable">
                          <div className="th-content">
                            <FaBuilding className="me-2" />
                            Company
                            {getSortIcon("company_name")}
                          </div>
                        </th>
                        <th onClick={() => handleSort("email")} className="sortable">
                          <div className="th-content">
                            <FaEnvelope className="me-2" />
                            Email
                            {getSortIcon("email")}
                          </div>
                        </th>
                        <th className="d-none d-md-table-cell">
                          <div className="th-content">
                            <FaPhone className="me-2" />
                            Phone
                          </div>
                        </th>
                        <th>Status</th>
                        <th onClick={() => handleSort("created_at")} className="sortable">
                          <div className="th-content">
                            <FaCalendarAlt className="me-2" />
                            Created
                            {getSortIcon("created_at")}
                          </div>
                        </th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((hr, index) => (
                        <tr key={hr.hr_id} className="hr-row">
                          <td>
                            <div className="hr-info">
                              <div className="hr-avatar">
                                {hr.hr_name.charAt(0).toUpperCase()}
                              </div>
                              <div className="hr-details">
                                <div className="hr-name">{hr.hr_name}</div>
                                <div className="hr-id">ID: {hr.hr_id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="company-cell">
                              <FaBuilding className="me-2 text-muted" />
                              {hr.company_name}
                            </div>
                          </td>
                          <td>
                            <div className="email-cell">
                              <FaEnvelope className="me-2 text-muted" />
                              {hr.email}
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="phone-cell">
                              {hr.phone ? (
                                <>
                                  <FaPhone className="me-2 text-muted" />
                                  {hr.phone}
                                </>
                              ) : (
                                <span className="text-muted">Not provided</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="status-cell">
                              <select
                                className={`status-select ${getStatusBadge(hr.status || "pending")}`}
                                value={hr.status || "pending"}
                                onChange={(e) => handleStatusChange(hr.hr_id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div className="date-cell">
                              <FaCalendarAlt className="me-2 text-muted" />
                              {new Date(hr.created_at).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDelete(hr.hr_id)}
                            >
                              <FaTrashAlt className="me-2" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  <span>Page {currentPage} of {totalPages}</span>
                  <span className="ms-3">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredHR.length)} of {filteredHR.length} results
                  </span>
                </div>
                <div className="pagination-controls">
                  {/* First Page */}
                  <button
                    className="btn btn-pagination"
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    title="First Page"
                  >
                    <FaAngleDoubleLeft />
                  </button>

                  {/* Previous Page */}
                  <button
                    className="btn btn-pagination"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    title="Previous Page"
                  >
                    <FaChevronLeft />
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map(page => (
                    <button
                      key={page}
                      className={`btn btn-pagination ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Page */}
                  <button
                    className="btn btn-pagination"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    title="Next Page"
                  >
                    <FaChevronRight />
                  </button>

                  {/* Last Page */}
                  <button
                    className="btn btn-pagination"
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    title="Last Page"
                  >
                    <FaAngleDoubleRight />
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
