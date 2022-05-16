import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Button from "../Button/Button";

const navigationButtonBar = {
  buttonText: "navigationButtonBar",
  iconClass: "buttonIcon",
};

const Navigation = () => {
  return (
    <>
      <ul>
        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("user")} />}
            text="About me"
            theme={navigationButtonBar}
            address="#aboutMe"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("graduation-cap")} />}
            text="Education"
            theme={navigationButtonBar}
            address="#timeLine"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("pen")} />}
            text="Experience"
            theme={navigationButtonBar}
            address="#experience"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("gem")} />}
            text="Skills"
            theme={navigationButtonBar}
            address="#skills"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("suitcase")} />}
            text="Portofolio"
            theme={navigationButtonBar}
            address="#projects"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("location-arrow")} />}
            text="Contacts"
            theme={navigationButtonBar}
            address="#contacts"
          />
        </li>

        <li tabIndex="0" id="navButton">
          <Button
            icon={<FontAwesomeIcon icon={solid("comment")} />}
            text="Feedback"
            theme={navigationButtonBar}
            address="#feedBack"
          />
        </li>
      </ul>
    </>
  );
};

export default Navigation;
