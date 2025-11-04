import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const ApiUrl = import.meta.env.VITE_USERS_API_URI;
console.log(ApiUrl, "apiUrl");
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${ApiUrl}/register`, {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data?.success);
    console.log(data?.token);
    if (data?.success) {
      alert("Registred successfully");
      navigate("/login");
    }
  };
  return (
    <div className="container" id="register-form">
      <form onSubmit={handleSubmit}>
        <h1 className="heading">Register form</h1>
        <label className="form-label">Name: </label>
        <input
          className="form-control"
          type="text"
          value={formData.name}
          name="name"
          placeholder="Enter your name here!"
          required
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label className="form-label">Email: </label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your password"
          required
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label className="form-label">Password: </label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          required
          onChange={(e) => handleChange(e)}
        />
        <br />
        <div className="register-button">
          <button className="btn btn-primary" id="btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
