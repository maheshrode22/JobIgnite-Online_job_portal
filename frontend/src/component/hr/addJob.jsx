// src/component/hr/AddJob.jsx
import React, { useState } from "react";

export default function AddJob() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", form);
    alert("Job added successfully!");
  };

  return (
    <div className="add-job-form">
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Department:
          <input type="text" name="department" value={form.department} onChange={handleChange} required />
        </label>

        <label>
          Location:
          <input type="text" name="location" value={form.location} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" required />
        </label>

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
