import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeRoutes from "./routes/homeRoutes";
import HrRoutes from "./routes/HrRoutes";
// import Home from "./component/pages/home";
// import About from "./component/pages/About";
// import Services from "./component/pages/Service";
// import Contact from "./component/pages/Contact";
// import Footer from "./component/footer";


// function App() {


  

//   return (
//     <Router>
//       <Navbar />
      
//       <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/About" element={<About/>}/>
//           <Route path="/services" element={<Services/>}/>
//           <Route path="/contact" element={<Contact/>}/>
//         </Routes>
//         <Footer/>
//     </Router>

//   );
// }


// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from "./component/pages/home";
import About from "./component/pages/Reviews";
import Services from "./component/pages/Service";
import Contact from "./component/pages/Contact";
import Footer from "./component/footer";
import LogoLoader from "./component/LogoLoader"; // new loader component
import ScrollToTop from "./component/scrollto";
import AdminLogin from "./component/AdminLogin";

// Separate component to handle loader on route change
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 150); // loader time
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && <LogoLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminLogin" element={<AdminLogin />} /> {/* 👈 route */}
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
         <Route path="/hr/*" element={<HrRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
