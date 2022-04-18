import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logout from "../Logout/Logout";
import UserProfile from "../../pages/UserProfile/UserProfile";
import "./Header.css";

const Header = (props) =>{
  const {
    userName,
    setUserName
  } = props

let menu ;
if (userName==="") {
  menu = (
    <>
    <a><LoginForm setUserName={setUserName}/></a>
    <a ><RegistrationForm/></a>
    </>
  )
} else {
  menu = (
    <>
  <a href="/profile" className="profileLink"> <img src="http://avatars0.githubusercontent.com/u/246180?v=4" className="profileAvatar"/></a>
    <a><Logout setUserName={setUserName}/></a>
    </>
  )
}

    return (
        <div className="header">
        <div className="header-right">
          <a className="active" href="/Inner">Home</a>
         {menu}
        </div>
      </div>
    )
}

export default Header;