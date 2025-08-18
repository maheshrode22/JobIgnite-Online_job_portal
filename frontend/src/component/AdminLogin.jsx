import React, { useState } from "react";
import "../css/AdminLogin.css"; // external CSS

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [isForgot, setIsForgot] = useState(false); // Toggle forgot password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isForgot) {
      alert(`Password reset link sent to: ${email}`);
    } else if (isLogin) {
      alert(`Admin Login:\nEmail: ${email}\nPassword: ${password}`);
    } else {
      alert(`Admin Registered:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card login-card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4 text-primary">
          {isForgot ? "Forgot Password" : isLogin ? "Admin Login" : "Admin Registration"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Registration Name Field */}
          {!isLogin && !isForgot && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          {/* Password Field (not in forgot mode) */}
          {!isForgot && (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3">
            {isForgot ? "Send Reset Link" : isLogin ? "Login" : "Register"}
          </button>
        </form>


        {/* Links */}
        <div className="text-center">
          {isLogin && !isForgot && (
            <>
              <p>
                <button
                  className="btn btn-link p-0"
                  onClick={() => setIsForgot(true)}
                >
                  Forgot Password?
                </button>
              </p>
              <p>
                Don’t have an account?{" "}
                <button
                  className="btn btn-link p-0"
                  onClick={() => {
                    setIsLogin(false);
                    setIsForgot(false);
                  }}
                >
                  Register
                </button>
              </p>
            </>
          )}


          {!isLogin && !isForgot && (
            <p>
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          )}

          {isForgot && (
            <p>
              Back to{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  setIsForgot(false);
                  setIsLogin(true);
                }}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

