import React, { useEffect, useState } from "react";
import "../styles/Tasks.css";
import { useNavigate } from "react-router-dom";

const TasksApiUrl = import.meta.env.VITE_TASKS_API_URI;

const Tasks = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const fetchAllTasks = async () => {
    if (!token) {
      setTasks([]);
      return;
    }
    try {
      const response = await fetch(`${TasksApiUrl}/getTasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      console.log("Fetched tasks:", data);

      setTasks(data?.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if(!token){
      alert("For add the task you have to Login first!! ")
      navigate('/login')
    }

    try {
      if (editIndex !== null) {
        // update locally
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = input;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks((prev) => [...prev, input]);
      }

      setInput("");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const handleEdit = (updateIndex) => {
    setInput(tasks[updateIndex]);
    setEditIndex(updateIndex);
  };

  const handleDelete = (deleteIndex) => {
    setTasks((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  useEffect(() => {
    fetchAllTasks();
  }, [token]);

  useEffect(()=>{
    const handleStorageChange = ()=>{
      setToken(localStorage.getItem('token'))
    }
    window.addEventListener('storage',handleStorageChange)
    return ()=> window.removeEventListener('storage',handleStorageChange)
  },[])

  return (
    <div className="container" id="task-page">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task here!"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" id="add-btn" type="submit">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <div className="tasks">
        {tasks.length > 0 ? (
          <ul className="task-items">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <p>{typeof task === "string" ? task : task.title}</p>
                <div className="button-group">
                  <button
                    className="btn btn-success"
                    onClick={() => handleEdit(index)}
                    id="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                    id="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available now</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
