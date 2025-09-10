import React, { useState, useEffect } from "react";
import { 
  PencilSquare, PersonFill, GeoAltFill, TelephoneFill, EnvelopeFill, FileEarmarkTextFill, StarFill, BookFill 
} from "react-bootstrap-icons";
import "../../css/jobSeeker/jobseekerProfile.css";
import { getCompleteProfile, updateSeeker, updateJobSeekerProfile } from "../../Services/SeekerService";

export default function SeekerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const response = await getCompleteProfile(userInfo.seeker_id);
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed to load profile:", error);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditing({ ...editing, [section]: true });
    setError("");
    setSuccess("");
  };

  const handleCancel = (section) => {
    setEditing({ ...editing, [section]: false });
    setFormData({ ...formData, ...profile });
    setResumeFile(null);
    setProfileFile(null);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setFormData({ ...formData, profile_image: URL.createObjectURL(file) });
    }
  };

  const handleSaveBasicInfo = async () => {
    try {
      const updateData = {
        seeker_id: profile.seeker_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        landmark: formData.landmark,
        pincode: formData.pincode,
        state_id: formData.state_id,
        district_id: formData.district_id,
        city_id: formData.city_id,
        gender: formData.gender,
        birth_date: formData.birth_date
      };
      await updateSeeker(updateData);
      setProfile({ ...profile, ...updateData });
      setEditing({ ...editing, basicInfo: false });
      setSuccess("Basic information updated successfully!");
    } catch (error) {
      setError("Failed to update basic information");
    }
  };

  const handleSaveResumeProfile = async () => {
    try {
      const form = new FormData();
      form.append("seeker_id", profile.seeker_id);
      if (resumeFile) form.append("resume", resumeFile);
      if (profileFile) form.append("profile_image", profileFile);

      form.append("skills", formData.skills || "");
      form.append("hobbies", formData.hobbies || "");
      form.append("languages", formData.languages || "");
      form.append("graduation", formData.graduation || "");
      form.append("graduation_university", formData.graduation_university || "");
      form.append("graduation_year", formData.graduation_year || "");
      form.append("graduation_cgpa", formData.graduation_cgpa || "");
      form.append("post_graduation", formData.post_graduation || "");
      form.append("post_graduation_university", formData.post_graduation_university || "");
      form.append("post_graduation_year", formData.post_graduation_year || "");
      form.append("post_graduation_cgpa", formData.post_graduation_cgpa || "");
      form.append("hsc_year", formData.hsc_year || "");
      form.append("hsc_marks", formData.hsc_marks || "");
      form.append("ssc_year", formData.ssc_year || "");
      form.append("ssc_marks", formData.ssc_marks || "");

      await updateJobSeekerProfile(form);

      setProfile({ 
        ...profile, 
        resume: resumeFile ? resumeFile.name : profile.resume, 
        profile_image: profileFile ? URL.createObjectURL(profileFile) : profile.profile_image,
        ...formData 
      });
      setEditing({ ...editing, resumeProfile: false, skillsInterests: false, education: false });
      setResumeFile(null);
      setProfileFile(null);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile information");
    }
  };

  const handleSaveSkillsInterests = handleSaveResumeProfile;
  const handleSaveEducation = handleSaveResumeProfile;

  if (loading) {
    return (
      <div className="container my-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container my-4">
        <div className="alert alert-warning">Profile not found. Please complete your registration.</div>
      </div>
    );
  }

  return (
    <div className="container my-4 seeker-profile">
      {/* Success/Error Messages */}
      {success && <div className="alert alert-success alert-dismissible fade show">{success}<button type="button" className="btn-close" onClick={() => setSuccess("")}></button></div>}
      {error && <div className="alert alert-danger alert-dismissible fade show">{error}<button type="button" className="btn-close" onClick={() => setError("")}></button></div>}

      {/* Header Profile Card */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="profile-avatar me-3 position-relative">
              {formData.profile_image ? (
                <img src={formData.profile_image} alt="Profile" className="rounded-circle" width="80" height="80" />
              ) : (
                <PersonFill size={60} className="text-muted" />
              )}
              {editing.resumeProfile && (
                <label className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow" style={{ cursor: "pointer" }}>
                  <PencilSquare size={16} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: "none" }} 
                    onChange={handleProfileImageChange} 
                  />
                </label>
              )}
            </div>
            <div>
              <h3 className="fw-bold mb-1">{profile.name}</h3>
              <p className="mb-1 text-muted"><EnvelopeFill size={14} className="me-2" />{profile.email}</p>
              <p className="mb-1 text-muted"><TelephoneFill size={14} className="me-2" />{profile.phone}</p>
              <p className="mb-0 text-muted"><GeoAltFill size={14} className="me-2" />{profile.address_line1}, {profile.address_line2 && `${profile.address_line2}, `}{profile.landmark && `${profile.landmark}, `}{profile.pincode}</p>
            </div>
          </div>
          <button className="btn btn-outline-primary btn-sm mt-3 mt-md-0">Recruiter's View</button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-semibold mb-0"><PersonFill className="me-2" /> Basic Information</h5>
          {!editing.basicInfo ? <PencilSquare className="text-secondary" style={{cursor:'pointer'}} onClick={() => handleEdit('basicInfo')} /> : <div>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveBasicInfo}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleCancel('basicInfo')}>Cancel</button>
          </div>}
        </div>
        <div className="row">
          <div className="col-md-6">
            {["name","email","phone","gender","birth_date"].map(field => (
              <div key={field} className="mb-3 d-flex align-items-center">
                <label className="form-label mb-0 me-2">{field.replace("_"," ").toUpperCase()}:</label>
                {!editing.basicInfo ? 
                  <p className="ms-2 mb-0">{field==="gender"? (profile.gender===1?"Male":profile.gender===0?"Female":"Not specified") : field==="birth_date" ? (profile.birth_date?new Date(profile.birth_date).toLocaleDateString():"Not specified") : profile[field]}</p> 
                  : (field==="gender" ? 
                    <select className="form-control" value={formData.gender || ''} onChange={(e)=>handleInputChange('gender',e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                    : field==="birth_date" ? 
                    <input type="date" className="form-control" value={formData.birth_date?formData.birth_date.split('T')[0]:''} onChange={(e)=>handleInputChange(field,e.target.value)} />
                    : <input type={field==="email"?"email":field==="phone"?"tel":"text"} className="form-control" value={formData[field]||''} onChange={(e)=>handleInputChange(field,e.target.value)} />
                  )
                }
              </div>
            ))}
          </div>
          <div className="col-md-6">
            {["address_line1","address_line2","landmark","pincode"].map(field => (
              <div key={field} className="mb-3 d-flex align-items-center">
                <label className="form-label mb-0 me-2">{field.replace("_"," ").toUpperCase()}:</label>
                {!editing.basicInfo ? <p className="ms-2 mb-0">{profile[field]||'Not specified'}</p> 
                : <input type={field==="pincode"?"number":"text"} className="form-control" value={formData[field]||''} onChange={(e)=>handleInputChange(field,e.target.value)} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume & Profile */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-semibold mb-0"><FileEarmarkTextFill className="me-2"/> Resume & Profile</h5>
          {!editing.resumeProfile ? <PencilSquare className="text-secondary" style={{cursor:'pointer'}} onClick={()=>handleEdit('resumeProfile')} /> : <div>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveResumeProfile}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('resumeProfile')}>Cancel</button>
          </div>}
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Resume Upload</label>
            {!editing.resumeProfile ? <p>{profile.resume || "Not uploaded"}</p> : <input type="file" className="form-control" onChange={handleResumeChange} />}
          </div>
          <div className="col-md-6 mb-3">
            <label>Profile Image</label>
            {!editing.resumeProfile ? (
              profile.profile_image ? <img src={profile.profile_image} alt="Profile" width="80" height="80" className="rounded-circle" /> : <p>Not uploaded</p>
            ) : (
              <input type="file" className="form-control" accept="image/*" onChange={handleProfileImageChange} />
            )}
          </div>
        </div>
      </div>

      {/* Skills & Interests */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-semibold mb-0"><StarFill className="me-2"/> Skills & Interests</h5>
          {!editing.skillsInterests ? <PencilSquare className="text-secondary" style={{cursor:'pointer'}} onClick={()=>handleEdit('skillsInterests')} /> : <div>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveSkillsInterests}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('skillsInterests')}>Cancel</button>
          </div>}
        </div>
        {["skills","hobbies","languages"].map(field=>(
          <div key={field} className="mb-3">
            <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            {!editing.skillsInterests ? <p>{profile[field] || 'Not specified'}</p> : <input type="text" className="form-control" value={formData[field]||''} onChange={(e)=>handleInputChange(field,e.target.value)} />}
          </div>
        ))}
      </div>

      {/* Education Details */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-semibold mb-0"><BookFill className="me-2"/> Education Details</h5>
          {!editing.education ? <PencilSquare className="text-secondary" style={{cursor:'pointer'}} onClick={()=>handleEdit('education')} /> : <div>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveEducation}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('education')}>Cancel</button>
          </div>}
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Graduation</label>
            {!editing.education ? <p>{profile.graduation || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.graduation||''} onChange={(e)=>handleInputChange('graduation',e.target.value)} />}
            <label>University</label>
            {!editing.education ? <p>{profile.graduation_university || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.graduation_university||''} onChange={(e)=>handleInputChange('graduation_university',e.target.value)} />}
            <label>Year</label>
            {!editing.education ? <p>{profile.graduation_year || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.graduation_year||''} onChange={(e)=>handleInputChange('graduation_year',e.target.value)} />}
            <label>CGPA/Marks</label>
            {!editing.education ? <p>{profile.graduation_cgpa || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.graduation_cgpa||''} onChange={(e)=>handleInputChange('graduation_cgpa',e.target.value)} />}
          </div>

          <div className="col-md-6">
            <label>Post Graduation</label>
            {!editing.education ? <p>{profile.post_graduation || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.post_graduation||''} onChange={(e)=>handleInputChange('post_graduation',e.target.value)} />}
            <label>University</label>
            {!editing.education ? <p>{profile.post_graduation_university || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.post_graduation_university||''} onChange={(e)=>handleInputChange('post_graduation_university',e.target.value)} />}
            <label>Year</label>
            {!editing.education ? <p>{profile.post_graduation_year || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.post_graduation_year||''} onChange={(e)=>handleInputChange('post_graduation_year',e.target.value)} />}
            <label>CGPA/Marks</label>
            {!editing.education ? <p>{profile.post_graduation_cgpa || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.post_graduation_cgpa||''} onChange={(e)=>handleInputChange('post_graduation_cgpa',e.target.value)} />}

            <hr/>

            <label>HSC Year/Marks</label>
            {!editing.education ? <p>{profile.hsc_year || 'Not specified'} / {profile.hsc_marks || 'Not specified'}</p> : <>
              <input type="text" className="form-control mb-2" value={formData.hsc_year||''} onChange={(e)=>handleInputChange('hsc_year',e.target.value)} />
              <input type="text" className="form-control" value={formData.hsc_marks||''} onChange={(e)=>handleInputChange('hsc_marks',e.target.value)} />
            </>}
            <label>SSC Year/Marks</label>
            {!editing.education ? <p>{profile.ssc_year || 'Not specified'} / {profile.ssc_marks || 'Not specified'}</p> : <>
              <input type="text" className="form-control mb-2" value={formData.ssc_year||''} onChange={(e)=>handleInputChange('ssc_year',e.target.value)} />
              <input type="text" className="form-control" value={formData.ssc_marks||''} onChange={(e)=>handleInputChange('ssc_marks',e.target.value)} />
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}
