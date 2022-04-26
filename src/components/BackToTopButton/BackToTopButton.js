import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

const BackToTopButton = (props) => {
  const { address } = props;

  return (
    <div className="backToTop">
      <Link to={`${address}`}>
        <FontAwesomeIcon
          icon={solid("angle-up")}
          style={{
            backgroundColor: "#222935",
            marginTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            borderRadius: "10px",
            color: "white",
          }}
        />
      </Link>
    </div>
  );
};

export default BackToTopButton;
