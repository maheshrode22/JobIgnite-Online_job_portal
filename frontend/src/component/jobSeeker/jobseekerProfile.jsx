import React, { useState, useEffect } from "react";
import { 
  PencilSquare, PersonFill, GeoAltFill, TelephoneFill, EnvelopeFill, FileEarmarkTextFill, StarFill, BookFill, BriefcaseFill
} from "react-bootstrap-icons";
import "../../css/jobSeeker/jobseekerProfile.css";
import { 
  getCompleteProfile, 
  updateSeeker, 
  updateJobSeekerProfile,
  savePersonalInfo,
  saveEducation,
  saveSkills,
  saveExperience,
  uploadResume,
  uploadProfileImage
} from "../../Services/SeekerService";

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

  // Updated Basic Info handler using new API
  const handleSaveBasicInfo = async () => {
    try {
      const personalData = {
        // Basic info for job_seekers table
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
        // Profile info for job_seeker_profile table
        gender: formData.gender,
        birth_date: formData.birth_date
      };
      
      await savePersonalInfo(personalData);
      
      // Refresh profile data from backend
      await loadProfile();
      setEditing({ ...editing, basicInfo: false });
      setSuccess("Personal information saved successfully!");
    } catch (error) {
      console.error("Error saving personal info:", error);
      setError("Failed to save personal information");
    }
  };

  // Updated Skills handler using new API
  const handleSaveSkillsInterests = async () => {
    try {
      const skillsData = {
        skills: formData.skills || "",
        hobbies: formData.hobbies || "",
        languages: formData.languages || ""
      };

      await saveSkills(skillsData);
      
      // Refresh profile data from backend
      await loadProfile();
      setEditing({ ...editing, skillsInterests: false });
      setSuccess("Skills and interests saved successfully!");
    } catch (error) {
      console.error("Error saving skills:", error);
      setError("Failed to save skills and interests");
    }
  };

  // Updated Education handler using new API
  const handleSaveEducation = async () => {
    try {
      const educationData = {
        // Graduation
        degree: formData.graduation || "",
        university: formData.graduation_university || "",
        year: formData.graduation_year || "",
        cgpa: formData.graduation_cgpa || "",
        // Post Graduation
        post_degree: formData.post_graduation || "",
        post_university: formData.post_graduation_university || "",
        post_year: formData.post_graduation_year || "",
        post_cgpa: formData.post_graduation_cgpa || "",
        // HSC
        hsc_year: formData.hsc_year || "",
        hsc_marks: formData.hsc_marks || "",
        // SSC
        ssc_year: formData.ssc_year || "",
        ssc_marks: formData.ssc_marks || ""
      };

      await saveEducation(educationData);
      
      // Refresh profile data from backend
      await loadProfile();
      setEditing({ ...editing, education: false });
      setSuccess("Education details saved successfully!");
    } catch (error) {
      console.error("Error saving education:", error);
      setError("Failed to save education details");
    }
  };

  // New Experience handler
  const handleSaveExperience = async () => {
    try {
      const experienceData = {
        company: formData.company || "",
        role: formData.role || "",
        years: formData.years || ""
      };

      await saveExperience(experienceData);
      
      // Refresh profile data from backend
      await loadProfile();
      setEditing({ ...editing, experience: false });
      setSuccess("Experience details saved successfully!");
    } catch (error) {
      console.error("Error saving experience:", error);
      setError("Failed to save experience details");
    }
  };

  // Separate handler for resume upload only
  const handleSaveResume = async () => {
    try {
      if (!resumeFile) {
        setError("Please select a resume file to upload");
        return;
      }

      const token = localStorage.getItem("token");
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const seekerId = userInfo.seeker_id;

      console.log("Uploading resume:", resumeFile.name);
      
      const response = await uploadResume(seekerId, resumeFile);
      
      // Update profile with new resume path
      setProfile({ 
        ...profile, 
        resume: response.data.filename || response.data.resume
      });
      
      setResumeFile(null);
      setSuccess("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      setError("Failed to upload resume");
    }
  };

  // Separate handler for profile image upload only
  const handleSaveProfileImage = async () => {
    try {
      if (!profileFile) {
        setError("Please select a profile image to upload");
        return;
      }

      const token = localStorage.getItem("token");
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const seekerId = userInfo.seeker_id;

      console.log("Uploading profile image:", profileFile.name);
      
      const response = await uploadProfileImage(seekerId, profileFile);
      
      // Update profile with new image path
      setProfile({ 
        ...profile, 
        profile_image: response.data.filename || response.data.profile_image
      });
      
      setProfileFile(null);
      setSuccess("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setError("Failed to upload profile image");
    }
  };

  // Keep the combined handler for backward compatibility
  const handleSaveResumeProfile = async () => {
    try {
      const form = new FormData();
      if (resumeFile) form.append("resume", resumeFile);
      if (profileFile) form.append("profile_image", profileFile);

      if (!resumeFile && !profileFile) {
        setError("Please select at least one file to upload");
        return;
      }

      console.log("Uploading files:", { resumeFile: resumeFile?.name, profileFile: profileFile?.name });

      const response = await updateJobSeekerProfile(form);
      
      // Use the file paths returned from the server
      setProfile({ 
        ...profile, 
        resume: response.data.data.resume || profile.resume, 
        profile_image: response.data.data.profile_image || profile.profile_image
      });
      setEditing({ ...editing, resumeProfile: false });
      setResumeFile(null);
      setProfileFile(null);
      setSuccess("Files uploaded successfully!");
    } catch (error) {
      console.error("Error saving files:", error);
      setError("Failed to upload files");
    }
  };

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
                <img 
                  src={formData.profile_image.startsWith('http') ? formData.profile_image : `http://localhost:3000/uploads/profile_images/${formData.profile_image}`} 
                  alt="Profile" 
                  className="rounded-circle" 
                  width="80" 
                  height="80" 
                />
              ) : (
                <PersonFill size={60} className="text-muted" />
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
                      : <input 
                          type={field==="email"?"email":field==="phone"?"tel":"text"} 
                          className="form-control" 
                          value={formData[field]||''} 
                          onChange={(e)=>handleInputChange(field,e.target.value)}
                          readOnly={field === "email"}
                        />
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
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveResume}>Save Resume</button>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveProfileImage}>Save Profile Image</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('resumeProfile')}>Cancel</button>
          </div>}
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Resume Upload</label>
            {!editing.resumeProfile ? (
              <div>
                <p>{profile.resume || "Not uploaded"}</p>
                {profile.resume && (
                  <a 
                    href={`http://localhost:3000/uploads/resumes/${profile.resume}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Download Resume
                  </a>
                )}
              </div>
            ) : (
              <div>
                <input type="file" className="form-control mb-2" onChange={handleResumeChange} />
                {resumeFile && (
                  <button className="btn btn-success btn-sm" onClick={handleSaveResume}>
                    Upload Resume
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label>Profile Image</label>
            {!editing.resumeProfile ? (
              profile.profile_image ? (
                <img 
                  src={profile.profile_image.startsWith('http') ? profile.profile_image : `http://localhost:3000/uploads/profile_images/${profile.profile_image}`} 
                  alt="Profile" 
                  width="80" 
                  height="80" 
                  className="rounded-circle" 
                />
              ) : <p>Not uploaded</p>
            ) : (
              <div>
                <input type="file" className="form-control mb-2" accept="image/*" onChange={handleProfileImageChange} />
                {profileFile && (
                  <button className="btn btn-success btn-sm" onClick={handleSaveProfileImage}>
                    Upload Image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Keep the combined save button for uploading both at once */}
        {editing.resumeProfile && (resumeFile || profileFile) && (
          <div className="text-center mt-3">
            <button className="btn btn-primary btn-sm me-2" onClick={handleSaveResumeProfile}>
              Save Both Files
            </button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('resumeProfile')}>
              Cancel
            </button>
          </div>
        )}
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

      {/* Experience Details */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-semibold mb-0"><BriefcaseFill className="me-2"/> Experience Details</h5>
          {!editing.experience ? <PencilSquare className="text-secondary" style={{cursor:'pointer'}} onClick={()=>handleEdit('experience')} /> : <div>
            <button className="btn btn-success btn-sm me-2" onClick={handleSaveExperience}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>handleCancel('experience')}>Cancel</button>
          </div>}
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Company</label>
            {!editing.experience ? <p>{profile.company || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.company||''} onChange={(e)=>handleInputChange('company',e.target.value)} />}
          </div>
          <div className="col-md-6">
            <label>Role/Position</label>
            {!editing.experience ? <p>{profile.role || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.role||''} onChange={(e)=>handleInputChange('role',e.target.value)} />}
          </div>
          <div className="col-md-12">
            <label>Years of Experience</label>
            {!editing.experience ? <p>{profile.years || 'Not specified'}</p> : <input type="text" className="form-control" value={formData.years||''} onChange={(e)=>handleInputChange('years',e.target.value)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
