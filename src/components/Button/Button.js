import { Link } from "react-router-dom";

const Button = (props) => {
  const { icon, text, theme, address } = props;
  return (
    <>
      <Link to={`${address}`} className={theme?.buttonClass}>
        <i className={theme?.iconClass}>{icon}</i>
        <span className={theme?.buttonText}>{text}</span>
      </Link>
    </>
  );
};

export default Button;
