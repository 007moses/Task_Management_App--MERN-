import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <div className="container rounded-4 m-5 border p-5 border-4 boder-radius border-primary">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">Email: </label>
        <input
          value={formData.email}
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter your email here !"
          onChange={(e)=>handleChange(e)}
        />
        <label className="form-label">Password</label>
        <input
          value={formData.password}
          type="password"
          className="form-control"
          name="password"
          placeholder="Enter your password !"
          onChange={(e)=>handleChange(e)}
        />
        <div className="d-flex justify-content-center align-items-center  w-full mt-4">
          <button className="btn btn-primary w-10">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
