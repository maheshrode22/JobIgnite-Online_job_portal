import React, { useState, useEffect } from "react";
import Sidebar from "../hr/sidebar"; // your existing sidebar
import Navbar from "../Navbar";       // your existing navbar
import { Outlet } from "react-router-dom";
import "../../css/Hr/HrDashboard.css";

export default function HrDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return <>
  <h1>hello</h1>
    </>
}
