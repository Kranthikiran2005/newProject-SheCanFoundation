import { useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      <div className="overlay">
        <h1>She Can Foundation Dashboard</h1>

        <div className="dashboard-buttons">

          <button onClick={() => navigate("/form")}>
            Open Contact Form
          </button>

          <button onClick={() => navigate("/messages")}>
            View Submissions
          </button>

          <button onClick={logout}>
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;