import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Logout from "../Logout/Logout";
import "./Header.css";
import Button from "../Button/Button";

let menu;
let adminPage;
let src;
const homeButton = {
  buttonClass: "headerElement",
  buttonText: "profileLink"
};


const Header = (props) => {
  const {
    userName,
    setUserName,
    role,
    setRole,
    imageSrc
  } = props

  if (imageSrc == null) {
    src = "http://avatars0.githubusercontent.com/u/246180?v=4"
  } else {
    src = `data:image/jpeg;base64,${imageSrc}`
  }

  if (role == "Admin") {
    adminPage = (
      <Button className="dashboard" address="/dashboard" text="Dashboard" theme={homeButton} />
    )
  }

  if (userName === "") {
    menu = (
      <>
        <div className="headerElement">
          <LoginForm setUserName={setUserName} setRole={setRole} />
        </div>
        <div className="headerElement">
          <RegistrationForm />
        </div>
      </>
    )
  } else {
    menu = (
      <>
        <Button theme={homeButton} address="/profile" text={<img src={src} className="profileAvatar" />} />
        {adminPage}
        <div className="headerElement">
          <Logout setUserName={setUserName} setRole={setRole} />
        </div>
      </>
    )
  }

  return (
    <div className="header">
      <div className="header-right">
        <Button address="/Inner" text="Home" className="active" theme={homeButton} />
        {menu}
      </div>
    </div>
  )
}

export default Header;