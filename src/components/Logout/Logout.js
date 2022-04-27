import "../Logout/Logout.css";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const { setUserName, setRole } = props;
  let navigate = useNavigate();

  const logout = async () => {
    await fetch("https://localhost:5000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setUserName("");
    setRole("");
    navigate("/Inner")
  };

  return (
    <div className="logoutButton">
      <button id="showLogot" className="showLogoutButton" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
