import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ToggleButton = (props) => {
  const { visibility } = props;

  return (
    <div className="toggleButton">
      <button
        type="button"
        id="sidebarCollapse"
        className="btn btn-outline-secondary"
        onClick={visibility}
      >
        <FontAwesomeIcon icon={solid("bars")} />
      </button>
    </div>
  );
};

export default ToggleButton;
