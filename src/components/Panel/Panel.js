import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../Button/Button";
import PhotoBox from "../PhotoBox/PhotoBox";
import Navigation from "../Navigation/Navigation";
import "../Panel/Panel.css";
import ToggleButton from "../ToggleButton/ToggleButton";
import { useDispatch, useSelector } from "react-redux";

const goBackTheme = {
  buttonText: "goBackButton",
  iconClass: "goBackButtonIcon",
  buttonClass: "angle-left",
};

const Panel = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.visibilityState.visibility);

  const activateSectionVisibility = () => {
    dispatch({ type: "VISIBILITY_ACTIVATED", payload: true });
  };

  const deactivateSectionVisibility = () => {
    dispatch({ type: "VISIBILITY_DEACTIVATED", payload: false });
  };

  const changeButtonState = () => {
    isVisible ? deactivateSectionVisibility() : activateSectionVisibility();
  };

  return (
    <>
      <nav
        className={isVisible ? "sideBarMenu active" : "sideBarMenu"}
        tabIndex="0"
        id="sidebar"
      >
        <ToggleButton visibility={changeButtonState} />
        <div className="sideBarAvatar">
          <PhotoBox
            name="John Doe"
            avatar="http://avatars0.githubusercontent.com/u/246180?v=4"
          />
        </div>
        <Navigation />
        <div className="goBack">
          <ul>
            <li tabIndex="0">
              <Button
                icon={<FontAwesomeIcon icon={solid("angle-left")} />}
                text="Go back"
                theme={goBackTheme}
                address="/"
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Panel;
