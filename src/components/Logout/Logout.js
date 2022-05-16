import "../Logout/Logout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/logoutThunk";
import { useAlert } from "../../hooks/useAlert";

const Logout = (props) => {
  const { setUserName, setRole } = props;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const triggerAlert = useAlert()

  const logout = async () => {
    const data = await dispatch(logoutUser())
    triggerAlert(data, "Logout successeful!")
    if (data.meta.requestStatus == "fulfilled") {
      setUserName("");
      setRole("");
      navigate("/Inner")
    }
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
