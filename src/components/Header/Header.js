import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logout from "../Logout/Logout";
import UserProfile from "../../pages/UserProfile/UserProfile";
import "./Header.css";

const Header = (props) =>{
  const {
    userName,
    setUserName,
    role,
    setRole,
    setImage,
    imageSrc
  } = props

let menu ;
let adminPage;
let src ;
if (imageSrc==""){
  src="http://avatars0.githubusercontent.com/u/246180?v=4"
} else {
src=`data:image/jpeg;base64,${imageSrc}`
}

if(role =="Admin"){
  adminPage = (
    <>
    <a href="/dashboard" className="dashboard">Dashboard</a>
    </>
  )
}

if (userName==="") {
  menu = (
    <>
    <a><LoginForm setUserName={setUserName} setRole={setRole}/></a>
    <a ><RegistrationForm/></a>
    </>
  )
} else {
  menu = (
    <>
  <a href="/profile" className="profileLink"> <img src={src} className="profileAvatar"/></a>
  {adminPage}
    <a><Logout setUserName={setUserName} setRole={setRole}/></a>
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