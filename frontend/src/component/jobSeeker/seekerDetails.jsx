import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSeeker, updateSeeker } from "../../Services/SeekerService";
import "../../css/jobSeeker/seekerDetail.css";

const SeekerDetail = () => {
  const [seeker, setSeeker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const seekerData = JSON.parse(localStorage.getItem("seekerData"));
    if (seekerData) {
      setSeeker(seekerData);
      setFormData({ ...seekerData, password: "" }); // password empty initially
    }
  }, []);

  const handleDelete = async () => {
    if (!seeker) return;
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteSeeker(seeker.seeker_id);
        localStorage.removeItem("seekerData");
        localStorage.removeItem("seeker_id");
        alert("Profile deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error("Error deleting profile:", err);
        alert("Failed to delete profile. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        seeker_id: seeker.seeker_id,
        name: formData.name,
        email: formData.email,   // email included for update
        phone: formData.phone,
        address: formData.address,
      };

      await updateSeeker(payload);

      const updatedData = { ...seeker, ...payload };
      localStorage.setItem("seekerData", JSON.stringify(updatedData));
      setSeeker(updatedData);

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!seeker) return <p className="loading-text">Loading Seeker Profile...</p>;

  return (
    <div className="seekerprofile-container">
      <div className="seekerprofile-card">
        <h2 className="seeker-profile-title">Seeker Profile</h2>

        {/* Name */}
        <div className="seekerprofile-item">
          <span className="label">Name:</span>
          {isEditing ? (
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          ) : (
            <span className="value">{seeker.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="seekerprofile-item">
          <span className="label">Email:</span>
          {isEditing ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          ) : (
            <span className="value">{seeker.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="seekerprofile-item">
          <span className="label">Phone:</span>
          {isEditing ? (
            <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} />
          ) : (
            <span className="value">{seeker.phone || "-"}</span>
          )}
        </div>

        {/* Address */}
        <div className="seekerprofile-item">
          <span className="label">Address:</span>
          {isEditing ? (
            <input type="text" name="address" value={formData.address || ""} onChange={handleChange} />
          ) : (
            <span className="value">{seeker.address || "-"}</span>
          )}
        </div>

        {/* Actions */}
        <div className="seekerprofile-actions">
          {isEditing ? (
            <>
              <button className="btn save" onClick={handleUpdate}>
                Save Changes
              </button>
              <button className="btn cancel" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn edit" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
              <button className="btn delete" onClick={handleDelete}>
                Delete Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerDetail;
