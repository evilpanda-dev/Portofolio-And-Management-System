import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import "./Header.css";
const Header = () =>{
    return (
        <div class="header">
        <div class="header-right">
          <a class="active" href="/">Home</a>
          <a><LoginForm/></a>
          <a ><RegistrationForm/></a>
        </div>
      </div>
    )
}

export default Header;