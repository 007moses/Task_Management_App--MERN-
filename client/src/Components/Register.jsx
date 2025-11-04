import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1>Register</h1>
      </div>

      {/* Responsive Form Wrapper */}
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form
            className="border border-3 border-primary rounded-4 p-4 shadow-sm bg-white"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                value={formData.email}
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                value={formData.password}
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
