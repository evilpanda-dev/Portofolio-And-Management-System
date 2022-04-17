import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logout from "../Logout/Logout";
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
<a><Logout setUserName={setUserName}/></a>
  )
}

    return (
        <div className="header">
        <div className="header-right">
          <a className="active" href="/">Home</a>
         {menu}
        </div>
      </div>
    )
}

export default Header;