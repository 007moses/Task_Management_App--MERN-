import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_USERS_API_URI;

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${ApiUrl}/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log(data);

      // Update form with fetched user data
      setFormData({
        name: data?.data?.name || "",
        email: data?.data?.email || "",
      });
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("Logged out successfully");
  };

  useEffect(() => {
    fetchUserDetails();
  }, [token]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="container">
      <h1>Profile</h1>
      {token ? (
        <form className="profile-form">
          <div className="name">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              readOnly
            />
            <button className="btn btn-primary" type="button">
              Edit
            </button>
          </div>

          <div className="email">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              readOnlyt
            />
            <button className="btn btn-primary" type="button">
              Edit
            </button>
          </div>

          <button
            className="btn btn-danger"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      ) : (
        <div>
          <button onClick={() => navigate("/login")} className="btn btn-info">
            Go back to login
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
